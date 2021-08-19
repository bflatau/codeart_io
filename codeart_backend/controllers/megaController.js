const buttonMap = {
  /// GREEN WIRES ///
  '54': 0,
  '55': 1,
  '56': 2,
  '57': 3,
  '58': 4,
  '59': 5,
  '60': 6,
  '61': 7,
  '62': 8,
  '63': 9,

  /// BLUE WIRES ///
  '2': 10,
  '3': 11,
  '4': 12,
  '5': 13,
  '6': 14,
  '7': 15,
  '8': 16,
  '9': 17,
  '10': 18,
  '11': 19,

  /// YELLOW WIRES ///
  '51': 20,
  '50': 21,
  '49': 22,
  '48': 23,
  '47': 24,
  '46': 25,
  '45': 26,
  '44': 27,
  '43': 28,
  '42': 29,

  /// PURPLE WIRES ///
  '41': 30,
  '40': 31,
  '39': 32,
  '38': 33,
  '37': 34,
  '36': 35,
  '35': 36,
  '34': 37,
  '33': 38,
  '32': 39,

  /// ORANGE WIRES ///
  '31': 40,
  '30': 41,
  '29': 42,
  '28': 43,
  '27': 44,
  '26': 45,
  '25': 46,
  '24': 47,
  '23': 48,
  '22': 49
};

const activeButtons = [];

exports.getMegaState = () =>{
  return activeButtons;
}

exports.initializeMega = (io) => {

  const five = require("johnny-five");
  board = new five.Board({ port: "/dev/ttyACM0" });

  board.on("ready", function() {

      buttons = new five.Buttons({

          ////ADD THE PINS!!!
          pins: [
            /// GREEN PINS ///            
            'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9',
            /// BLUE PINS ///
            '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
            /// YELLOW PINS ///
            '51', '50', '49', '48', '47', '46', '45', '44', '43', '42',
            /// PURPLE PINS ///
            '41', '40', '39', '38', '37', '36', '35', '34', '33', '32',
            // ORANGE PINS ///
            '31', '30', '29', '28', '27', '26', '25', '24', '23', '22'
          ],
          // holdtime: 2000,
          isPullup: true
        //   pin: 50
        //   invert: true
      });

      buttons.on("down", function(button) {
        console.log(`button ${button.pin} is down`);
        // broadcast which button was pushed
        io.sockets.emit('button down', buttonMap[button.pin]);
        // add button to running list of active buttons (state)
        activeButtons.push(buttonMap[button.pin]);
      });

      buttons.on("up", function(button) {
        console.log(`button ${button.pin} is up`);
        // broadcast which button was pushed
        io.sockets.emit('button up', buttonMap[button.pin])
        // find the index of the button released in the active buttons array
        const upIndex = activeButtons.indexOf(buttonMap[button.pin]);
        // splice out the button that was released
        if (upIndex > -1) {
          activeButtons.splice(upIndex, 1);
        }
      });
    });  
}