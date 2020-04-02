/// SETUP DEPENDENCIES ///
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser  = require("body-parser");
const cors = require('cors');



/// INITIALIZE SERVICE VARIABLES ///
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

/// REQUIRE CONTROLLERS ///
const buttonController = require('./controllers/buttonController');


/// SET UP CORS ///
// need to call cors before setting up routes
// Set up a whitelist and check against it:

// const whitelist = ['http://test.awarchitect.com']
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

/// USE MIDDLEWARE ///
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors(corsOptions));
app.use(cors());



/// PUBLIC API ENDPOINTS ///

app.get('/bentest', function (req, res) {
  res.send('helloooooo')
});

app.route('/game/:gameNumber/on/:buttonNumber')
  .post(buttonController.handleKeyOn);

app.route('/game/:gameNumber/off/:buttonNumber')
  .post(buttonController.handleKeyOff);

app.route('/game/:gameNumber/getkeyquantity')
  .get(buttonController.getKeyQuantity);




/// WEB SOCKET STUFF ///

io.on('connection', socket => {

  console.log('New client connected')
  io.sockets.emit('connected users', io.engine.clientsCount);
  
  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('change color', (color) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('Color Changed to: ', color)
    io.sockets.emit('change color', color)
  })
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
    io.sockets.emit('connected users', io.engine.clientsCount);
  })
})


//// NEW SERVER STUFF /////
const port = 8090;
server.listen(port, () => console.log(`Listening on port ${port}`));






// /// SET SERVER CONSTANTS ///
// const PORT = 8090;
// const HOST = '0.0.0.0';

// /// RUN SERVER ///
// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);














////FILE SYSTEM STUFF ///

//might need to change end points at some point to avoid file name conflicts (now functions as one big folder)
// app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/node_modules"));


///CORS STUFF/////

// const cors = require('cors');


// need to call cors before setting up routes
// // Set up a whitelist and check against it:
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

// // Then pass them to cors:
// app.use(cors(corsOptions));

// app.use(cors());

