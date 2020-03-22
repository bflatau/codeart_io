/// SETUP DEPENDENCIES ///
const express = require('express');
const bodyParser  = require("body-parser");
const app = express();
const cors = require('cors');

/// REQUIRE CONTROLLERS ///
// const userTestController = require('./controllers/users/userTestController');
const loginController = require('./controllers/users/loginController');
const permissionsController = require('./controllers/users/permissionsController');
const emailController = require('./controllers/email/postmarkController');
const storiesController = require('./controllers/stories/storiesController');

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
app.route('/login')
  .post(loginController.verify_password_and_user);

app.route('/email')
  .post(emailController.sendEmail)

app.route('/person/:name')
.get(storiesController.get_person_stories)




app.route('/apitestget')
  .get((req, res)=> {
    res.json('GET WORKS!');
  });

  app.route('/apitestpost')
  .post((req, res)=> {
    res.json('POST WORKS!');
  });


/// PROTECTED API RESOURCES ///

app.route('/cpanel')
  .get(permissionsController.has_permission);
  // .get((req, res)=> {
  //   res.json('sup');
  // });

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

