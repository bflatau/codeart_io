

exports.initializeUno = () => {

    const five = require("johnny-five");
    board = new five.Board({ port: "/dev/ttyACM1" });

    board.on("ready", function () {

        buttons = new five.Buttons({

            ////ADD THE PINS!!!
            pins: [
                /// GREEN PINS ///            
                'A0', 'A1', 'A2', 'A3', 'A4', 'A5'
            
            ],
            // holdtime: 2000,
            isPullup: true
            //   pin: 50
            //   invert: true
        });

        buttons.on("down", function (button) {
            console.log(`button ${button.pin} is down`);
        });

        buttons.on("up", function (button) {
            console.log(`button ${button.pin} is up`);
        });
    }); 

}
