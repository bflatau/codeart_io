const boardLength = 120;

const games = [
  { gameNumber: 0, winningKeys: [ 1, 2, 3, 4, 5, 6 ], winningValue: 'X' },
  { gameNumber: 1, winningKeys: [ 46, 47, 48, 49, 50 ], winningValue: 'Y' },
  { gameNumber: 2, winningKeys: [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ], winningValue: 'Z' },
]



///FUNCTIONS////





////CONTROLLERS/////

exports.getKeyQuantity = (req,res) => {
  res.json({'data': games[req.params.gameNumber].winningKeys.length});
}


exports.handleKeyOn = (req, res) => {
 
  const buttonInt = parseInt(req.params.buttonNumber);
  const gameInt = parseInt(req.params.gameNumber);
  const requestBoardArray = req.body.boardArray.data;
  const magicButtonPressed = games[gameInt].winningKeys.includes(buttonInt);
  const magicButtons = games[gameInt].winningKeys;
  const searchValue = games[gameInt].winningValue;
  const numberOfResults = (requestBoardArray.length / magicButtons.length);


  function getRandomInputResponses (){
    const takenIndexes = [];
    let outputBoardArray = requestBoardArray.slice();
  
    //loop through initial board array and identify which winning values are taken and send to an array//
    for (i = 0; i < requestBoardArray.length; i++){
      if (requestBoardArray[i] === searchValue){
        takenIndexes.push(i);
      }
    }
  
    //loop for the number of new winning values to be added, identify random indices, check that they are unique
    // and then add them the array of taken indices, if not unique, generate a new number and try again
    for (i = 0; i < numberOfResults; i++){
      let randomIndex = Math.floor(Math.random() * requestBoardArray.length);
  
      findUnique(randomIndex);
  
      function findUnique(randomValue){
        if (outputBoardArray[randomValue] !== searchValue){

          (magicButtonPressed) ? outputBoardArray[randomValue] = searchValue :
          outputBoardArray[randomValue] = Math.floor(Math.random() * 10);
        }
        else{
          let otherRandomIndex = Math.floor(Math.random() * requestBoardArray.length);
          findUnique(otherRandomIndex);
        }
      }   
      
    }
    return outputBoardArray;
  }

  res.json({'data': getRandomInputResponses()});  
};


exports.handleKeyOff = (req, res) => {

  const outputBoardArray = req.body.boardArray.data;

 
      res.json({'data': outputBoardArray});
};


