
exports.updateBoard = (req, res) => {

  const boardLength = 120;
  const games = [
    {
      gameNumber: 1,
      numberOfKeys: 4
    }
  ]

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






exports.getGame = (req,res) => {
  
  const games = [
    {
      gameNumber: 1,
      numberOfKeys: 4,
      winningNumbers: [1,20, 101, 120]
    }
  ]

}