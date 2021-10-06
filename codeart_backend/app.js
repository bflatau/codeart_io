/// SETUP DEPENDENCIES ///
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser  = require("body-parser");
const cors = require('cors');
const SerialPort = require('serialport')
const {Splitflap, Util} = require('splitflapjs')
const {PB} = require('splitflapjs-proto')

/// INITIALIZE SERVICE VARIABLES ///
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

/// REQUIRE CONTROLLERS ///
const buttonController = require('./controllers/buttonController');
const megaController = require('./controllers/megaController');

/// SET UP CORS ///
// need to call cors before setting up routes
// Set up a whitelist and check against it:

// const whitelist = ['http://codeart.benflatau.com']
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

/// USE MIDDLEWARE ///
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors(corsOptions));
app.use(cors());



/// PUBLIC API ENDPOINTS ///
app.get('/bentest', function (req, res) {
  res.send('helloooooo')
});

app.route('/game/:gameNumber/on/:buttonNumber')
  .post(buttonController.handleKeyOn);

app.route('/game/:gameNumber/off/:buttonNumber')
  .post(buttonController.handleKeyOff);

app.route('/game/:gameNumber/getkeyquantity')
  .get(buttonController.getKeyQuantity);

/// ARDUINO STUFF ///
const findPort = (ports, description, infoList) => {
  const matchingPorts = ports.filter((portInfo) => {
    return infoList.some(([vendorId, productId, serialNumber]) => {
      return portInfo.vendorId === vendorId && portInfo.productId === productId && portInfo.serialNumber === serialNumber
    })
  })

  if (matchingPorts.length < 1) {
    console.warn(`No matching ${description} usb serial port found (vendorId=${infoList}! Available ports: ${JSON.stringify(ports, undefined, 4)}`)
    return null
  } else if (matchingPorts.length > 1) {
    console.warn(`Multiple ${description} usb serial ports found: ${JSON.stringify(matchingPorts, undefined, 4)}`)
    return null
  }
  console.info(`Found ${description} port at ${matchingPorts[0].path}`)
  return matchingPorts[0]
}

let splitflapLatestState = null

const splitflapStateForFrontend = (splitflapStatePb) => {
  const remappedTo2d = Util.convert1dChainlinkTo2dDualRowZigZag(splitflapStatePb.modules, 18, true)
  const singleRow = [].concat(...remappedTo2d);
  return {
    modules: singleRow,
  }
}

const initializeHardware = async () => {
  const ports = (await SerialPort.list()).filter((portInfo) => portInfo.vendorId !== undefined)

  const splitflapPortInfo = findPort(ports, 'splitflap', [
    ['10c4', 'ea60', '022809A3'], // real
    ['10c4', 'ea60', '02280A9E'], // development
  ])

  const splitflap = new Splitflap(splitflapPortInfo !== null ? splitflapPortInfo.path : null, (message) => {
      if (message.payload === 'log') {
        console.log(`SPLITFLAP LOG: ${message.log.msg}`)
      } else if (message.payload === 'splitflapState' && message.splitflapState && message.splitflapState.modules) {
        splitflapLatestState = PB.SplitflapState.toObject(message.splitflapState, {defaults: true})

        io.sockets.emit('splitflap_state', splitflapStateForFrontend(splitflapLatestState))
      } else if (message.payload === 'supervisorState' && message.supervisorState) {
        io.sockets.emit('splitflap_supervisor_state', PB.SupervisorState.toObject(message.supervisorState))
      }
  }, 108)

  const initialPositions = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  splitflap.setFlaps(Util.convert2dDualRowZigZagTo1dChainlink(initialPositions, true))

  app.post('/splitflap/hard_reset', async (req, res) => {
    await splitflap.hardReset()
    res.send('ok')
  })
  app.post('/splitflap/reset_module', async (req, res) => {
    console.log(req.body)
    const resetMap = []
    for (let row = 0; row < 6; row++) {
      resetMap.push(new Array(18).fill(false))
    }
    resetMap[req.body.y][req.body.x] = true
    splitflap.resetModules(Util.convert2dDualRowZigZagTo1dChainlink(resetMap, true))
    res.send('ok')
  })
  app.get('/splitflap/state', async (req, res) => {
    res.json(splitflapLatestState === null ? null : PB.SplitflapState.toObject(splitflapLatestState, {
      defaults: true,
    }))
  })


  const megaPortInfo = findPort(ports, 'mega', [
    ['2341', '0010', '6493833393235110A1A0'], // real
    ['2341', '0042', '5543830343935160C121'], // scott's
  ])
  if (megaPortInfo !== null) {
    megaController.initializeMega(io, megaPortInfo.path, splitflap);
  }
}

initializeHardware()


/// WEB SOCKET STUFF ///
io.on('connection', socket => {

  /// On connect, console log on server, and then send number of users to client
  io.sockets.emit('connected users', {numberOfUsers: io.engine.clientsCount});

  if (splitflapLatestState !== null) {
    io.to(socket.id).emit('splitflap_state', splitflapStateForFrontend(splitflapLatestState))
  }

  /// get mega button state when connecting and send to newly connected user
  if (megaController.getMegaButtonState().length > 0){  
    megaController.getMegaButtonState().forEach(button =>{
      io.to(socket.id).emit('button down', {buttons: button, flaps: megaController.getFlapState()})
    });
  } 

  else {io.to(socket.id).emit('button down', {buttons: null , flaps: megaController.getFlapState()})}

  /// When a user disconnects, console log and then update the clients with the user count
  socket.on('disconnect', () => {
    console.log('user disconnected')
    io.sockets.emit('connected users', {numberOfUsers: io.engine.clientsCount});

  })
})

//// WEB SERVER STUFF /////
const port = 8090;
server.listen(port, () => console.log(`Listening on port ${port}`));






// /// SET SERVER CONSTANTS ///
// const PORT = 8090;
// const HOST = '0.0.0.0';

// /// RUN SERVER ///
// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);














////FILE SYSTEM STUFF ///

//might need to change end points at some point to avoid file name conflicts (now functions as one big folder)
// app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/node_modules"));


///CORS STUFF/////

// const cors = require('cors');


// need to call cors before setting up routes
// // Set up a whitelist and check against it:
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

// // Then pass them to cors:
// app.use(cors(corsOptions));

// app.use(cors());

