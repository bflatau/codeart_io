


exports.initializeMegaHall = () => {

  const five = require("johnny-five");
  // board = new five.Board({ port: "/dev/ttyACM0" }); //use this when utilizing multiple boards, see readme for board designation
  board = new five.Board(); 
  board.on("ready", function() {
    
    
    var button = new five.Button(2);

    button.on("hold", function () {
      console.log("Button held");
    });

    button.on("press", function () {
      console.log("Button pressed");
    });

    button.on("release", function () {
      console.log("Button released");
    });






    // var sensor = new five.Sensor({
    //   pin:  2,
    //   type: "digital",
    //   // threshold: 1,
    //   // freq: 500



    // });

    // sensor.on("change", function () {
    //   // console.log(sensor.value);
    //   console.log(sensor.boolean);
      
    //   console.log(sensor.analog);
    //   console.log(sensor.constrained);
    //   console.log(sensor.raw);
    //   console.log(this.value);
    // });

     
  });  
}