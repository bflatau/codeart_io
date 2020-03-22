// const { db } = require('../../db');
// const sql = require('../../sql').users;


// exports.get_all_users = (req, res) => {

//     let sco; // shared connection object;
//     db.connect()
//         .then(obj => {
//             // obj.client = new connected Client object;

//             sco = obj; // save the connection object;

//             // execute all the queries you need:
//             // return sco.any('SELECT * FROM users');
//             return sco.any(sql.getAll);
//         })
//         .then(data => {
//             // success
//             console.log('success!');
//             res.json(data);
//         })
//         .catch(error => {
//             // error
//             console.log('error!', error);
//         })
//         .finally(() => {
//             // release the connection, if it was successful:
//             if (sco) {
//                 sco.done();
//                 console.log('connection closed');
//             }  
//         })
// };


// exports.get_admin = (req, res) => {

//     let sco; // shared connection object;
//     db.connect()
//         .then(obj => {
            
//             sco = obj; // save the connection object;
//             return sco.any(sql.getAdmin);
//         })
//         .then(data => {
//             // success
//             console.log('success!');
//             res.json(data);
//         })
//         .catch(error => {
//             // error
//             console.log('error!', error);
//         })
//         .finally(() => {
//             // release the connection, if it was successful:
//             if (sco) {
//                 sco.done();
//                 console.log('connection closed');
//             }  
//         })
// };

