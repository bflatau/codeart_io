const buttonMap = {
  '57': 0,
  '56': 1,
  '55': 2,
  '54': 3
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

