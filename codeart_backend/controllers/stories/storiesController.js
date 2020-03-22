const { db } = require('../../db');
const sql = require('../../sql').stories;

exports.get_person_stories = (req, res) => {

    let sco; // shared connection object;
    db.connect()
        .then(obj => {
            // obj.client = new connected Client object;

            sco = obj; // save the connection object;

            // execute all the queries you need:
            // return sco.any('SELECT * FROM users');
            console.log(req.url.slice(8));
            return sco.any(
                            `SELECT * FROM people 
                                WHERE person_url = '${req.url.slice(8)}'`
            );



            
        })
        .then(data => {
            // success
            console.log('success!');
            res.json(data);
        })
        .catch(error => {
            // error
            console.log('error!', error);
        })
        .finally(() => {
            // release the connection, if it was successful:
            if (sco) {
                sco.done();
                console.log('connection closed');
            }  
        })
};