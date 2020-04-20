const buttonMap = {

  /// GREEN WIRES ///

  'A0': 0,
  'A1': 1,
  'A2': 2,
  'A3': 3,
  'A4': 4,
  'A5': 5,
  'A6': 6,
  'A7': 7,
  'A8': 8,
  'A9': 9,

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

  '53': 20,
  '52': 21,
  '51': 22,
  '50': 23,
  '49': 24,
  '48': 25,
  '47': 26,
  '46': 27,
  '45': 28,
  '44': 29,

  /// PURPLE WIRES ///

  '43': 30,
  '42': 31,
  '41': 32,
  '40': 33,
  '39': 34,
  '38': 35,
  '37': 36,
  '36': 37,
  '35': 38,
  '34': 39,

  /// ORANGE WIRES ///

  '33': 40,
  '32': 41,
  '31': 42,
  '30': 43,
  '29': 44,
  '28': 45,
  '27': 46,
  '26': 47,
  '25': 48,
  '24': 49


};

const activeButtons = [];



exports.getMegaState = () =>{
  return activeButtons;
}

exports.initializeMega = (io) => {

  const five = require("johnny-five");
  board = new five.Board();

  board.on("ready", function() {

      buttons = new five.Buttons({
          pins: ['A0', 'A1', 'A2', 'A3', 'A4'],
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

        // console.log(activeButtons);
      });

      buttons.on("up", function(button) {
        console.log(`button ${button.pin} is up`);
        // broadcast which button was pushed
        io.sockets.emit('button up', buttonMap[button.pin])
        // find the index of the button released in the active buttons array
        const upIndex = activeButtons.indexOf(buttonMap[button.pin]);
        // splice out the 
        if (upIndex > -1) {
          activeButtons.splice(upIndex, 1);
        }

        // console.log(activeButtons);
      });
    
    });  
}





// "hold" the button is pressed for specified time.
//        defaults to 500ms (1/2 second)
//        set
// buttons.on("hold", function(button) {
//   console.log("this button is on", button.pin);
// });

