/// SETUP DEPENDENCIES ///
require('dotenv').config();

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser  = require("body-parser");
const cors = require('cors');
const SerialPort = require('serialport')
const {Splitflap, Util} = require('splitflapjs')
const {PB} = require('splitflapjs-proto')
const {welcome, randomFill, spiral, rain, testAll, sequence1, wheelOfFortune} = require('./animations')

/// INITIALIZE SERVICE VARIABLES ///
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

/// REQUIRE CONTROLLERS ///
const openaiController = require('./controllers/openaiController');



app.get('/openai', (req, res) => { 
  openaiController.getResponse(res)
})

/// SETUP CORS ///

// need to call cors before setting up routes
// Set up a whitelist and check against it:

// const whitelist = ['http://0.0.0.0:3000/dalle-playground']
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
app.use(bodyParser.urlencoded({extended: false})); //BEN NOTE: note sure what this does, was false
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/level_editor"));
app.use(express.static(__dirname + "/public/text_input"));

// console.log('this is dir', __dirname)


/// ENABLE ALL CORS STUFF ///

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


/// PUBLIC API ENDPOINTS ///
app.get("/debug", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  });
});


app.get("/text", (req, res) => {
  res.sendFile(`${__dirname}/public/level_editor/level-editor.html`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  });
});

app.get("/input", (req, res) => {
  res.sendFile(`${__dirname}/public/text_input/index.html`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  });
});



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

let splitflapConfig2d = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
let animationFrame2d = []


let animationTimeout = null
let currentAnimation = null

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

const stringToMovementMask = (str) => {
  return str.split('').map((c) => c === '1')
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


  const sendSplitflapConfig = () => {
    splitflap.setFlaps(Util.convert2dDualRowZigZagTo1dChainlink(currentAnimation !== null ? animationFrame2d : splitflapConfig2d, true))
  }

  // Periodically sync splitflap config, e.g. in case MCU gets restarted
  sendSplitflapConfig()
  setInterval(sendSplitflapConfig, 5000)

  const animationFrame = () => {
    const current = currentAnimation.next()
    if (!current.done) {
      const frameData = current.value
      console.log(frameData)
      if (typeof frameData[1][0] === 'string') {
        animationFrame2d = frameData[1].map(stringToFlapIndexArray)
      } else {
        animationFrame2d = frameData[1].map((a) => a.map(charToFlapIndex))
      }
      let movementMask
      if (frameData[2]) {
        let mask
        if (typeof frameData[2][0] === 'string') {
          mask = frameData[2].map(stringToMovementMask)
        } else {
          mask = frameData[2]
        }
        movementMask = Util.convert2dDualRowZigZagTo1dChainlink(mask, true)
      }
      splitflap.setFlaps(Util.convert2dDualRowZigZagTo1dChainlink(animationFrame2d, true), movementMask)
      const frameTime = frameData[0]
      animationTimeout = setTimeout(animationFrame, frameTime)
    } else {
      stopAnimation()
    }
  }

  const startAnimation = (animation) => {
    stopAnimation()
    currentAnimation = animation
    animationFrame()
  }

  const stopAnimation = () => {
    if (animationTimeout) {
      clearTimeout(animationTimeout)
      animationTimeout = null
    }
    currentAnimation = null
    sendSplitflapConfig()
  }


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
  app.post('/splitflap/set_flaps', async (req, res) => {

    console.log(req.body, 'this is req')
    const newLayout = []
    for (let i = 0; i < 6; i++) {
      newLayout.push(new Array(18).fill(0))
    }
    let row = 0;
    let col = 0;
    console.log(req.body)
    for (let i = 0; i < req.body.text.length && row < 6; i++) {
      const char = req.body.text[i]
      if (char === '\n') {
        col = 0
        row++
        continue
      }

      const flapIndex = flaps.indexOf(char)
      newLayout[row][col] = flapIndex == -1 ? 0 : flapIndex
      col++
      if (col >= 18) {
        row++
        col = 0
      }
    }
    console.log(newLayout)
    splitflapConfig2d = newLayout
    sendSplitflapConfig()
    res.send('ok')
  })
  app.post('/splitflap/start_animation', async (req, res) => {
    const wofGames = [
      ['EVENT', [
        '',
        '  CODE ART',
        '  PALO ALTO',
      ]],
      ['SONG LYRICS', [
        '  NEVER',
        '  GONNA GIVE',
        '  YOU UP',
        ''
      ]],
    ]
    const wof = wofGames[Math.floor(Math.random() * wofGames.length)]
    const animations = {
      'welcome': welcome.values(),
      'rain': rain('w', 'g', 6000, 6000),
      'spiral': spiral('o', 'y', 6000, 6000),
      'testAll': testAll(),
      'randomFill': randomFill(' ', 'random', 6000, 6000),
      'sequence1': sequence1(),
      'wheelOfFortune': wheelOfFortune([
        '  NEVER',
        '  GONNA GIVE',
        '  YOU UP',
        ''
      ])
    }
    startAnimation(animations[req.body.animation])
    res.send('ok')
  })
  app.post('/splitflap/stop_animation', async (req, res) => {
    stopAnimation()
    res.send('ok')
  })
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
  // if (megaController.getMegaButtonState().length > 0){  
  //   megaController.getMegaButtonState().forEach(button =>{
  //     io.to(socket.id).emit('button down', {buttons: button, flaps: megaController.getFlapState()})
  //   });
  // } 

  // else {io.to(socket.id).emit('button down', {buttons: null , flaps: megaController.getFlapState()})}

  /// When a user disconnects, console log and then update the clients with the user count
  socket.on('disconnect', () => {
    console.log('user disconnected')
    io.sockets.emit('connected users', {numberOfUsers: io.engine.clientsCount});

  })
})

//// WEB SERVER STUFF /////
const port = 8090;
server.listen(port, () => console.log(`Listening on port ${port}`));



