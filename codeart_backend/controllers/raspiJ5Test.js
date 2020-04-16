const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});


// sudo "$(which node)" javascriptfile.js


board.on('ready', () => {

  // Create an Led on pin 7 (GPIO4) on P1 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
//   (new five.Led('P1-7')).strobe();

buttons = new five.Buttons({
    pins: [0, 12, 14],
    holdtime: 2000
  //   pin: 50
  //   invert: true
});

// Inject the `button` hardware into
// the Repl instance's context;
// allows direct command line access
//   board.repl.inject({
//     button: button
//   });

// Button Event API

// "down" the button is pressed
//   button.on("down", function() {
//     console.log("down");
//   });

// "hold" the button is pressed for specified time.
//        defaults to 500ms (1/2 second)
//        set
buttons.on("hold", function(button) {
  console.log("this button is on", button.pin);
});


});