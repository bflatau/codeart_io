/// SETUP DEPENDENCIES ///
const express = require('express');
const bodyParser  = require("body-parser");
const app = express();
const cors = require('cors');

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

app.route('/update/:gameNumber/:toggle/:buttonNumber')
  .get(buttonController.updateBoard)

app.route('/update/:gameNumber/:toggle/:buttonNumber')
.get(buttonController.updateBoard)

app.route('/:gameNumber/getkeys')
.get(buttonController.getKeys)



/// SET SERVER CONSTANTS ///
const PORT = 8080;
const HOST = '0.0.0.0';

/// RUN SERVER ///
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);














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

