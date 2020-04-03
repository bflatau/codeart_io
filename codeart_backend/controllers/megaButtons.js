const five = require("johnny-five");

board = new five.Board();

board.on("ready", function() {

buttons = new five.Buttons({
    pins: [53, 51, 49, 47, 45, 43, 41, 39],
    holdtime: 2000,
    isPullup: true
  //   pin: 50
  //   invert: true
});


  buttons.on("down", function(button) {
    console.log(`button ${button.pin} is down`);
  });

});






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