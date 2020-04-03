// var five = require("johnny-five"),
//     board = new five.Board();

// board.on("ready", function() {
//   // Create an Led on pin 13
//   var led = new five.Led(13);

//   // Strobe the pin on/off, defaults to 100ms phases
//   led.strobe();
// });

var five = require("johnny-five"),
  board, button;

board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance

  // The "shared property" interface, allows
  // writing a more succint initialization,
  // as it's effectively a short hand for:
  //
  // var buttons = new five.Buttons([
  //   { pin: 2, invert: true },
  //   { pin: 3, invert: true },
  //   { pin: 4, invert: true },
  //   { pin: 5, invert: true },
  //   { pin: 6, invert: true },
  // });
  //


  buttons = new five.Buttons({
      pins: [53, 51, 49, 47, 45, 43, 41, 39],
      holdtime: 2000,
      isPullup: true
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
  buttons.on("down", function(button) {
    console.log(`button ${button.pin} is down`);
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  // buttons.on("hold", function(button) {
  //   console.log("this button is on", button.pin);
  // });

  // "up" the button is released
  buttons.on("up", function(button) {
    console.log(`button ${button.pin} is up`);
  });
});