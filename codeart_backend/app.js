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
const schedule = require('node-schedule');

/// INITIALIZE SERVICE VARIABLES ///
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const DISCORD_CHANNEL_DEBUG = '990787044613705818'
const DISCORD_CHANNEL_ERROR = '990787072950403123'
const DISCORD_CLIENT_ID = '990787828290027551'
const DISCORD_GUILD_ID = '990786994139451442'
const REGISTER_COMMANDS = false; // Set to true and run the server once to register updated discord slash commands

const WAKEUP_HOUR = 9;
const WAKEUP_MINUTE = 33;

const DEFAULT_PROMPT = 'ASK ME A QUESTION\nAND I WILL FIND A\nTRIVIA CLUE\n\nWHO IS wwwww?\nWHAT IS ggggg?'

let sequenceRunning = false
let disabled = false

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



// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

/// REQUIRE CONTROLLERS ///
const openaiController = require('./controllers/openaiController');

const discord = new Client({
  intents: [Intents.FLAGS.GUILDS]
});


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


app.get("/test", (req, res) => {
  res.status(200).json({ result: 'sup'});
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
let splitflapLatestSupervisorState = null

const splitflapStateForFrontend = (splitflapStatePb) => {
  const remappedTo2d = Util.convert1dChainlinkTo2dDualRowZigZag(splitflapStatePb.modules, 18, true)
  const singleRow = [].concat(...remappedTo2d);
  return {
    modules: singleRow,
  }
}

const emptyConfig2d = () => {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
}
let splitflapConfig2d = emptyConfig2d()
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

/// DISCORD ///

async function initializeDiscord() {
  console.log('Initialize discord')
  const ready = new Promise((resolve, reject) => {
    discord.once("error", reject);
    discord.once("ready", () => {
      discord.off("error", reject);
      resolve();
    });
  });
  await discord.login(process.env.DISCORD_TOKEN)
  await ready
  await sendDiscordDebug('App starting')
}

async function sendDiscordDebug(message) {
  console.log('DISCORD DEBUG', message)
  try {
    const channel = discord.channels.cache.get(DISCORD_CHANNEL_DEBUG);
    channel.send(message);
  } catch (e) {
    console.error(e);
  }
}
async function sendDiscordError(message) {
  console.log('DISCORD ERROR', message)
  try {
    const channel = discord.channels.cache.get(DISCORD_CHANNEL_ERROR);
    channel.send(message);
  } catch (e) {
    console.error(e);
  }
}

const setInputKeyboard = () => {
  if (sequenceRunning || disabled) {
    io.sockets.emit('keyboard', {enable: false})
  } else {
    io.sockets.emit('keyboard', {enable: true});
  }
}

// Periodically re-sync the input keyboard status (in case something happens, don't want it to get stuck disabled)
setInterval(setInputKeyboard, 10000)

/// INITIALIZE HARDWARE ////
const initializeHardware = async () => {
  console.log('Initialize hardware')
  const ports = (await SerialPort.list()).filter((portInfo) => portInfo.vendorId !== undefined)

  const splitflapPortInfo = findPort(ports, 'splitflap', [
    //vendor id | product id | serial number//
    ['10c4', 'ea60', '022809A3'], // real
    ['10c4', 'ea60', '02280A9E'], // development
    ['1a86', '55d4', '5424024039'], //ben dev
    ['1a86', '55d4', '5435001167'], //scott dev
  ])

  let lastState = undefined
  let lastDebugStatus = 0
  let lastModuleErrorCount = undefined

  const splitflap = new Splitflap(splitflapPortInfo !== null ? splitflapPortInfo.path : null, (message) => {
      if (message.payload === 'log') {
        console.log(`SPLITFLAP LOG: ${message.log.msg}`)
      } else if (message.payload === 'splitflapState' && message.splitflapState && message.splitflapState.modules) {
        splitflapLatestState = PB.SplitflapState.toObject(message.splitflapState, {defaults: true})

        io.sockets.emit('splitflap_state', splitflapStateForFrontend(splitflapLatestState))
        let errors = 0
        for (const module of splitflapLatestState.modules) {
          if (module.state !== PB.SplitflapState.ModuleState.State.NORMAL && module.state !== PB.SplitflapState.ModuleState.State.LOOK_FOR_HOME) {
            errors += 1
          }
        }

        if (lastModuleErrorCount !== undefined && errors > lastModuleErrorCount) {
          sendDiscordError(`Modules with errors increased from ${lastModuleErrorCount} to ${errors}`)
        }
        lastModuleErrorCount = errors
      } else if (message.payload === 'supervisorState' && message.supervisorState) {
        splitflapLatestSupervisorState = PB.SupervisorState.toObject(message.supervisorState)
        io.sockets.emit('splitflap_supervisor_state', splitflapLatestSupervisorState)
        const currentState = message.supervisorState?.state
        if (lastState && currentState !== lastState) {
          sendDiscordDebug(`State changed: ${JSON.stringify(message.supervisorState, undefined, 4)}`)
          if (currentState === PB.SupervisorState.State.FAULT) {
            sendDiscordError(`FAULT! ${JSON.stringify(message.supervisorState, undefined, 4)}`)
          }
        }
        lastState = currentState

        if (Date.now() - lastDebugStatus > 1*60*60*1000) {
          if (lastDebugStatus) {
            sendDiscordDebug(`Current state:\n${JSON.stringify(message.supervisorState)}`)
          }
          lastDebugStatus = Date.now()
        }
      }
  }, 108)


  const sendSplitflapConfig = () => {
    splitflap.setFlaps(Util.convert2dDualRowZigZagTo1dChainlink(disabled ? emptyConfig2d() : currentAnimation !== null ? animationFrame2d : splitflapConfig2d, true))
  }

  // Periodically sync splitflap config, e.g. in case MCU gets restarted
  sendSplitflapConfig()
  setInterval(sendSplitflapConfig, 5000)


  const wakeupRule = new schedule.RecurrenceRule();
  wakeupRule.hour = WAKEUP_HOUR;
  wakeupRule.minute = WAKEUP_MINUTE;
  wakeupRule.tz = 'America/Los_Angeles'
  const wakeupJob = schedule.scheduleJob(wakeupRule, async () => {
    await sendDiscordDebug("Good morning! I'm going to try turning on the splitflap. Wish me luck!");
    await sleep(1000);
    await splitflap.hardReset();
    await sleep(10000);
    await enable();
  })
  console.log(`Wakeup is scheduled for ${wakeupJob.nextInvocation()}`)

  const disable = async () => {
    await sendDiscordDebug("Disabling!")
    stopAnimation();
    disabled = true
    setInputKeyboard();
    showText('', false);
  }

  const enable = async () => {
    await sendDiscordDebug("Enabling!")
    disabled = false
    setInputKeyboard();
    showText(DEFAULT_PROMPT, false)
  }

  if (REGISTER_COMMANDS) {
    const commands = [
      {
        name: 'reset',
        description: 'ESP32 hard reset',
      },
      {
        name: 'disable',
        description: 'Disable input and clear display',
      },
      {
        name: 'enable',
        description: 'Enable input and ',
      },
    ]
    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  }
  discord.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    if (interaction.commandName === 'reset') {
      await sendDiscordDebug(`Running hard reset!\nrequested by bot`)
      await splitflap.hardReset()
      await interaction.reply('done');
    } else if (interaction.commandName == 'disable') {
      await disable()
      await interaction.reply('done')
    } else if (interaction.commandName == 'enable') {
      await enable()
      await interaction.reply('done')
    }
  });


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


  //HELPER FUNCTIONS

  function logConfig2d(config2d, important) {
    const text = ' ------------------ \n'
     + config2d.map((row) => '|' + row.map((flapIndex) => flaps[flapIndex]).join('') + '|').join('\n') + '\n'
     + ' ------------------ '
    console.log(text)
    if (important && !disabled) {
      sendDiscordDebug('```' + text + '```')
    }
  }

  function getLayoutFromText(text) {
    const newLayout = []
    for (let i = 0; i < 6; i++) {
      newLayout.push(new Array(18).fill(0))
    }
    let row = 0;
    let col = 0;
    for (let i = 0; i < text.length && row < 6; i++) {
      const char = text[i]
      if (char === '\n') {
        col = 0
        row++
        continue
      }

      if (col >= 18) {
        row++
        col = 0
      }

      if (row >= 6) {
        break;
      }

      const flapIndex = flaps.indexOf(char)
      newLayout[row][col] = flapIndex == -1 ? 0 : flapIndex
      col++
    }
    return newLayout
  }

  function showText(text, important=true){
    const newLayout = getLayoutFromText(text)
    logConfig2d(newLayout, important)
    splitflapConfig2d = newLayout
    sendSplitflapConfig()


    //BEN TESTS (updates UI to show flap layout)
    const frontEndArray = newLayout[0].concat(newLayout[1],newLayout[2], newLayout[3], newLayout[4], newLayout[5])
    io.sockets.emit('button down', {buttons: '1', flaps: frontEndArray});

    //END BEN TESTS
  }

  function translateToSplitflapAlphabet(text) {
    return text.replaceAll("'", '')
    .replaceAll('"', '*')
    .replaceAll(',', '')
  }

  function chunk(arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;
  
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
  
    return chunks;
  }

  function wrap(text, rowLength) {
    const rows = [];

    const lines = text.split('\n')
    for (const line of lines) {
      let currRow = [];
      let currRowLength = 0;
      const words = line.split(' ')

      for (const word of words) {
        if ((currRowLength + word.length) <= rowLength) {
          currRowLength += word.length + 1;
          currRow.push(word);
        } else {
          rows.push(currRow);
          currRow = [word];
          currRowLength = word.length + 1;
        }
      };
      
      rows.push(currRow);
    }

    const rowsWithSpaces = rows.map(row => row.join(' '))

    return rowsWithSpaces
  }

  async function showTextRows(rows, important=true, skipSleep=false) {
    const fullPages = chunk(rows, 6)
    for (let i = 0; i < fullPages.length; i++) {
      const page = fullPages[i]
      const pageText = page.join('\n')
      const numLetters = Array.from(pageText.matchAll(/[A-Z]/g)).length
      showText(pageText, important)
      await waitForIdle();
      if (!(skipSleep && i === fullPages.length - 1)) {
        if (numLetters > 70) {
          await sleep(15000)
        } else {
          await sleep(8000)
        }
      }
    }
  }

  async function wordWrapAndShowText(text, important=true) {
    await showTextRows(wrap(translateToSplitflapAlphabet(text), 18), important)
  }

  async function sleep(time) {
    await new Promise((resolve, _) => setTimeout(resolve, time))
  }

  async function waitForIdle(timeout=8000) {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      await sleep(1000)
      if (splitflapLatestState) {
        let anyMoving = false
        for (const module of splitflapLatestState.modules) {
          if (module.moving) {
            anyMoving = true
            break
          }
        }
        if (!anyMoving) {
          return
        }
      }
    }
    console.log('waitForIdle timed out');
  }

//////API ENDPOINTS ////

  app.post('/splitflap/hard_reset', async (req, res) => {
    await sendDiscordDebug(`Running hard reset!\nrequested by ${req.socket.remoteAddress}`)
    await splitflap.hardReset()
    res.send('ok')
  })
  app.post('/splitflap/reset_module', async (req, res) => {
    await sendDiscordDebug(`Resetting module ${req.body.x}, ${req.body.y} requested by ${req.socket.remoteAddress}`)
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
    showText(req.body.text)
    res.send('ok')
  })
  app.post('/splitflap/text', async (req, res) => {
    await wordWrapAndShowText(req.body.text)
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


  async function runOpenAiSequence(text) {
    if (sequenceRunning || text.length === 0) {
      return
    }
    sequenceRunning = true
    try {
      setInputKeyboard()
      if (text.length > 80 || !await openaiController.isContentSafe(text)) {
        await wordWrapAndShowText('PLEASE ASK ANOTHER QUESTION')
      } else {
        // Start fetching embedding data
        const embeddingPromise = openaiController.getEmbeddingData(text)

        await showTextRows([''], false, true)
        await sleep(1000)

        const askedRows = wrap(translateToSplitflapAlphabet('pppp YOU ASKED ppp\n' + text.toUpperCase()), 18);
        for (let i = 0; i < askedRows.length; i++) {
          await showTextRows(askedRows.slice(0, i+1), false, true)
          await sleep(500)
        }

        // By sleeping _before_ awaiting the embedding promise, we require a minimum of 3 seconds delay (or longer if the embedding takes longer to resolve)
        await sleep(3000)
        const embeddingData = await embeddingPromise
        
        const foundRows = wrap(translateToSplitflapAlphabet('ggggg I FOUND gggg\n' + embeddingData.question.toUpperCase()), 18);

        if (askedRows.length + foundRows.length < 6) {
          // Include a blank row if we can afford it
          await showTextRows([...askedRows, '', ...foundRows], true, true)
        } else if (askedRows.length + foundRows.length === 6) {
          // Can't afford a blank line
          await showTextRows([...askedRows, ...foundRows], true, true)
        } else {
          // Replace the whole screen with the "I FOUND" screen
          await sleep(2000)
          await showTextRows(foundRows, true, true)
        }

        await sleep(8000)

        await wordWrapAndShowText(embeddingData.answer.toUpperCase() + 'w')
      }
    } catch (e) {
      sendDiscordError(`Error in openai sequence: ${e}`)
    } finally {
      showText(DEFAULT_PROMPT, false)
      sequenceRunning = false
      setInputKeyboard()
    }
  }

  app.post('/openai', async (req, res) => { 
    // Note: intentionally not awaiting promise so we can return immediately
    runOpenAiSequence(req.body.text)
    res.send('ok')

    // const unsafeResponse = openaiController.wordWrapResponse('PLEASE ASK ANOTHER QUESTION');
    // const safeQuestion = openaiController.wordWrapResponse('YOU ASKED\n' + req.body.text);
    // const AIdataResponse = await openaiController.checkContent(req.body.text);  //response from OPENAI

    // async function sendEmbeddings(){
    //     const embeddingData= await openaiController.getEmbeddingData(req.body.text);  //response from OPENAI
    //     const embeddingQuestion = embeddingData.question
    //     const embeddingAnswer = embeddingData.answer

    //     showText(openaiController.wordWrapResponse(`I FOUND A MATCH /n /n ${embeddingQuestion}`)); //send openai quesion

    //     setTimeout(() => {
    //       showText(openaiController.wordWrapResponse(embeddingAnswer)); //send openai answer
    //       askMessage('15000'); 
    //     }, 10000);

    // }


    // if(AIdataResponse.body.text === 'UNSAFE'){
    //   showText(unsafeResponse);
    //   askMessage('10000'); /// REVERT TO ASK MESSAGE
    // } else {
    //     showText(safeQuestion);
    //     setTimeout(() => {
    //       showText(openaiController.wordWrapResponse('HMMM LET ME THINK ABOUT THAT')); //send openai answer
    //     }, 12000);
    //     sendEmbeddings()
    // }

  })



  ///BEN ADD NEW ANIMATIONS HERE ///
  setTimeout(() => showText(DEFAULT_PROMPT, false), 2000);
}

async function run() {
  await initializeDiscord()
  await initializeHardware()
}
run()


/// WEB SOCKET STUFF ///
io.on('connection', socket => {

  /// On connect, console log on server, and then send number of users to client
  io.sockets.emit('connected users', {numberOfUsers: io.engine.clientsCount});

  if (splitflapLatestState !== null) {
    io.to(socket.id).emit('splitflap_state', splitflapStateForFrontend(splitflapLatestState))
  }

  setInputKeyboard()
  /// get mega button state when connecting and send to newly connected user
  // if (megaController.getMegaButtonState().length > 0){  
  //   megaController.getMegaButtonState().forEach(button =>{
  //     io.to(socket.id).emit('button down', {buttons: button, flaps: megaController.getFlapState()})
  //   });
  // } 

  // else {io.to(socket.id).emit('button down', {buttons: null , flaps: megaController.getFlapState()})}

  /// When a user disconnects, console log and then update the clients with the user count
  socket.on('disconnect', () => {
    // console.log('user disconnected')
    io.sockets.emit('connected users', {numberOfUsers: io.engine.clientsCount});

  })
})

//// WEB SERVER STUFF /////
const port = 8090;
server.listen(port, () => console.log(`Listening on port ${port}`));



