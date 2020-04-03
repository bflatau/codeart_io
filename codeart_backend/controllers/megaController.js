const five = require("johnny-five");
board = new five.Board();

exports.initializeMega = (io) => {


 return board.on("ready", function() {

    buttons = new five.Buttons({
        pins: [1, 2, 3, 4, 5, 6, 7, 8],
        holdtime: 2000,
        isPullup: true
      //   pin: 50
      //   invert: true
    });

    buttonPressed = ()=>{
      buttons.on("down", function(button) {
        console.log(`button ${button.pin} is down`);
        io.sockets.emit('button pressed', button.pin)
      });
    }
   
   buttonPressed();
  });
  
  
  // io.sockets.emit('button pressed', testNumber)


}





// "hold" the button is pressed for specified time.
//        defaults to 500ms (1/2 second)
//        set
// buttons.on("hold", function(button) {
//   console.log("this button is on", button.pin);
// });

// "up" the button is released
// buttons.on("up", function(button) {
//   console.log(`button ${button.pin} is up`);
// });