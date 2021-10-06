const { buttonDown , buttonUp, convertToState, gamesList, initialGameStateObject } = require( "./splitFlapController");
const {Util} = require('splitflapjs')

const buttonMap = { //this maps the arduino mega pins with a 0-XX number
  ///STRING ON LEFT IS ARDUINO PIN NUMBERS
  /// NUMBER ON RIGHT IS PIN ID FOR HUMAN CONSUMPTION
  // BOX 1 //
  '16': 0,  
  '17': 1, 

  // BOX 2 //
  '2': 2, 
  '3': 3, 

  // BOX 3 //
  '4': 5, 
  '5': 4, 

  // BOX 4 // 
  '6': 7,
  '7': 6, 

  // BOX 5 // 
  '8': 9, 
  '9': 8, 

  // BOX 6 // 
  '10': 10, 
  '11': 11, 

  // BOX 7 // 
  '12': 13, 
  '13': 12, 

  // BOX 8 // 
  '14': 15, 
  '15': 14, 

  // BOX 9 // 
  '52': 16, 
  '53': 17, 

  // BOX 10 // 
  '50': 18, 
  '51': 19, 

  // BOX 11 // 
  '48': 21, 
  '49': 20, 

  // BOX 12 // 
  '46': 22, 
  '47': 23, 

  // BOX 13 // 
  '44': 25, 
  '45': 24, 

  // BOX 14 // 
  '42': 27, 
  '43': 26, 

  // BOX 15 // 
  '40': 28, 
  '41': 29, 

  // BOX 16 // 
  '38': 30, 
  '39': 31, 

  // BOX 17 // 
  '36': 32, 
  '37': 33,

  // BOX 18 // 
  '34': 34, 
  '35': 35,

  // BOX 19 // 
  '32': 36, 
  '33': 37,

  // BOX 20 // 
  '30': 38, 
  '31': 39,

  // BOX 21 // 
  '28': 41, 
  '29': 40,

  // BOX 22 // 
  '26': 43, 
  '27': 42,

  // BOX 23 // 
  '24': 45, 
  '25': 44,

  // BOX 24 // 
  '22': 46, 
  '23': 47,

};

const activeButtons = []; // array of boxes that are turned on
let gameState = convertToState(gamesList[0]) ;

exports.getFlapState = () => {
  return gameState.forScott
};

exports.setgameNumber= (number) =>{
  gameState = convertToState(gamesList[number]) 
}

exports.getMegaButtonState = () =>{ //returns active button state
  return activeButtons;
}

exports.initializeMega = (io, port, splitflap) => {

  let splitflapState2d = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]

  const sendSplitflapConfig = () => {
    splitflap.setFlaps(Util.convert2dDualRowZigZagTo1dChainlink(splitflapState2d, true))
  }

  const updateSplitflap = (allIndexes) => {
    const newSplitflapState = []
    for (let i = 0; i < 6; i++) {
      newSplitflapState.push(allIndexes.slice(i*18, (i+1)*18))
    }
    splitflapState2d = newSplitflapState
    sendSplitflapConfig()
  }

  // Periodically sync splitflap config, e.g. in case MCU gets restarted
  setInterval(sendSplitflapConfig, 5000);

  const five = require("johnny-five");
  // board = new five.Board({ port: "/dev/ttyACM0" }); //use this when utilizing multiple boards, see readme for board designation
  board = new five.Board({port}); 
  board.on("ready", function() {
      buttons = new five.Buttons({
          pins: [
            /// ANALOG ROW ///            
            // 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15',
            /// DIGITAL BLOCK ///
            '53', '52', '51', '50', '49', '48', '47', '46', '45', '44', '43', '42',
            '41', '40', '39', '38', '37', '36', '35', '34', '33', '32',
            '31', '30', '29', '28', '27', '26', '25', '24', '23', '22',
            /// COMM ROW ///
            // '21', '20',
            /// TX/RX ROW //
             '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'
          ],
          // holdtime: 2000,
          isPullup: true
        //   pin: 50
        //   invert: true
      });

      buttons.on("down", function(button) {
        console.log('button map pin is down', buttonMap[button.pin]);
        //update gamestate based on button going down
        gameState = buttonDown(gameState, buttonMap[button.pin]);
        // broadcast which button was pushed
        io.sockets.emit('button down', {buttons: buttonMap[button.pin], flaps: gameState.forScott});

        updateSplitflap(gameState.forScott)
        // add button to running list of active buttons (state)
        activeButtons.push(buttonMap[button.pin]);
      });

      buttons.on("up", function(button) {
        console.log('button map pin is up', buttonMap[button.pin])
        // update gamestate based on button going up
        gameState = buttonUp(gameState, buttonMap[button.pin]);
        // broadcast which button was pushed
        io.sockets.emit('button up', {buttons: buttonMap[button.pin], flaps: gameState.forScott})

        updateSplitflap(gameState.forScott)

        // find the index of the button released in the active buttons array
        const upIndex = activeButtons.indexOf(buttonMap[button.pin]);
        // splice out the button that was released
        if (upIndex > -1) {
          activeButtons.splice(upIndex, 1);
        }
      });
    });  
}




///// ANALOG BUTTONS REFERENCE ////


  // // BOX 1 //
  // '54': 0, // A0
  // '55': 1, // A1

  // // BOX 2 //
  // '56': 2, // A2
  // '57': 3, // A3

  // // BOX 3 //
  // '58': 4, // A4
  // '59': 5, // A5

  // // BOX 4 // 
  // '60': 6, // A6
  // '61': 7, // A7

  // // BOX 5 // 
  // '62': 8, // A8
  // '63': 9, // A9

  // // BOX 6 // 
  // '64': 10, // A10
  // '65': 11, // A11

  // // BOX 7 // 
  // '66': 12, // A12
  // '67': 13, // A13

  // // BOX 8 // 
  // '68': 14, // A14
  // '69': 15, // A15
