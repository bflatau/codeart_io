/// SETUP DEPENDENCIES ///
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser  = require("body-parser");
const cors = require('cors');
const SerialPort = require('serialport')
const {Splitflap, Util} = require('splitflapjs')

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
const findPort = (ports, description, vendorId, productId, serialNumber) => {
  const matchingPorts = ports.filter((portInfo) => {
    return portInfo.vendorId === vendorId && portInfo.productId === productId && portInfo.serialNumber === serialNumber
  })

  if (matchingPorts.length < 1) {
    console.warn(`No matching ${description} usb serial port found (vendorId=${vendorId}, productId=${productId}, serialNumber=${serialNumber}! Available ports: ${JSON.stringify(ports, undefined, 4)}`)
    return null
  } else if (matchingPorts.length > 1) {
    console.warn(`Multiple ${description} usb serial ports found: ${JSON.stringify(matchingPorts, undefined, 4)}`)
    return null
  }
  console.info(`Found ${description} port at ${matchingPorts[0].path}`)
  return matchingPorts[0]
}


const initializeHardware = async () => {
  const ports = (await SerialPort.list()).filter((portInfo) => portInfo.vendorId !== undefined)

  const splitflapPortInfo = findPort(ports, 'splitflap', '10c4', 'ea60', '022809A3')

  const splitflapPort = splitflapPortInfo !== null ? new SerialPort(splitflapPortInfo.path, {baudRate: 230400}) : null
  const splitflap = new Splitflap(splitflapPort, (message) => {
      if (message.payload === 'log') {
        console.log(`SPLITFLAP LOG: ${message.log.msg}`)
      } else if (message.payload === 'splitflapState') {
        // TODO: publish to frontend
      }
  })


  const flaps = [
    ' ', // BLACK
    'J', // 1
    'B', // 2
    'M', // 3
    'R', // 4
    '$', // 5
    'V', // 6
    'K', // 7
    'A', // 8
    'E', // 9
    'N', // 10
    'O', // 11
    'y', // YELLOW
    '*', // 13
    'g', // GREEN
    'G', // 15
    'I', // 16
    '%', // 17
    'D', // 18
    'L', // 19
    '&', // 20
    '@', // 21
    'C', // 22
    'W', // 23
    'H', // 24
    'Y', // 25
    'w', // WHITE
    'Q', // 27
    'p', // PINK
    'o', // ORANGE
    '!', // 30
    'T', // 31
    'Z', // 32
    'P', // 33
    'F', // 34
    '?', // 35
    'S', // 36
    '#', // 37
    'U', // 38
    'X', // 39
]

  const charToFlapIndex = (c) => {
    const i = flaps.indexOf(c)
    if (i >= 0) {
        return i
    } else {
        return null
    }
  }

  const stringToFlapIndexArray = (str) => {
      return str.split('').map(charToFlapIndex)
  }

  const test = [
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
  ]

  splitflap.setPositions(Util.mapDualRowZigZagToLinear(test.map(stringToFlapIndexArray), true))

  const megaPortInfo = findPort(ports, 'mega', '2341', '0010', '6493833393235110A1A0')
  if (megaPortInfo !== null) {
    megaController.initializeMega(io, megaPortInfo.path, splitflap);
  }
}

initializeHardware()


/// WEB SOCKET STUFF ///
io.on('connection', socket => {

  /// On connect, console log on server, and then send number of users to client
  io.sockets.emit('connected users', {numberOfUsers: io.engine.clientsCount});

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

