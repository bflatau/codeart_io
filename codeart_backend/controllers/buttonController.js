const boardLength = 120;


const games = [
  { gameNumber: 1, numberOfKeys: 10 },
  { gameNumber: 2, numberOfKeys: 14 },
  { gameNumber: 3, numberOfKeys: 13 },
]


exports.updateBoard = (req, res) => {
  
  function generateResponseArray(){
    const responseArray = [];
    for (let i = 0; i < boardLength; i++){
        responseArray.push(i + parseInt(req.params.buttonNumber));
    }
    return responseArray;
  }

  const responseValue = generateResponseArray();
 
      res.json({'data': responseValue});
      console.log(req.params.buttonNumber);
};



exports.getKeys = (req,res) => {
  res.json({'data': games[req.params.gameNumber].numberOfKeys});

}