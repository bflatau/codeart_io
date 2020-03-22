const { db } = require('../../db');
const sql = require('../../sql').users;
const bcryptController = require('../bcryptController');
const { assignToken } = require('../tokenController');

///TODO: Ben make sure this is following best practices///
exports.verify_password_and_user = (req, res) => {
    db.one(sql.getAdmin)
    .then(dbData => {
        const pass = req.body.password;
        const bodyUser = req.body.username;
        const dbUser = dbData.user_name;
        const salt = dbData.password_salt;
        const hash = dbData.password_hash;
        const isValid = bcryptController.checkPassword(pass, salt, hash);
        
        if (!isValid) {
            res.status(400);
            res.json({err: 'Password Invalid'});
          } else if(bodyUser === dbUser) {
            assignToken(dbData, res);
            // res.json('match!');
          } else {
              res.status(400);
              res.json({err: 'Username Invalid'})
          }
    })
    .catch(error => {
        console.log('ERROR:', error); // print error;
        res.status(500);
        res.json({err: err});
    });
  };