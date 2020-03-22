const tokenController = require('../tokenController');

exports.has_permission = (req, res) => {
    const token = req.get('Authorization');
    if(tokenController.validateToken(token)) {
        res.json('success!') 
    }else{
        res.json('failurrreee')
    }
  };
