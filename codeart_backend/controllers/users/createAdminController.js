const { db } = require('../../db');
const sql = require('../../sql').users;



exports.create_admin = (bcryptObj) => {

  db.one(sql.createAdmin, ['admin', bcryptObj.password_hash, bcryptObj.salt])
  .then(data => {
      console.log(data); // print admin ;
  })
  .catch(error => {
      console.log('ERROR:', error); // print error;
  });
};



