const boardLength = 120;

const games = [
  { gameNumber: 0, winningKeys: [ 1, 2, 3, 4, 5, 6 ] },
  { gameNumber: 1, winningKeys: [ 116, 117, 118, 119, 120 ] },
  { gameNumber: 2, winningKeys: [ 21, 22, 23, 24, 25 ] },
]



///FUNCTIONS////

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}


// console.log(getRandom([1,2,3,4], 2));





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

  function generateResponseArray(){

    let responseBoardArray = requestBoardArray.slice();


    if (magicButtonPressed){
      replacementValues = getRandom(requestBoardArray, (requestBoardArray.length / magicButtons.length));

      console.log('here are replacement values', replacementValues);

      function replaceWithX(){ replacementValues.forEach(value =>{
          responseBoardArray.splice(value, 1, 'X');
          console.log(responseBoardArray);
        });

        return responseBoardArray;
      }
      

      return replaceWithX();

    }

    else{
      return requestBoardArray;
    }
    // return responseArray;
  }
      
  res.json({'data': generateResponseArray()});
    
};


exports.handleKeyOff = (req, res) => {

  const outputBoardArray = req.body.boardArray.data;

 
      res.json({'data': outputBoardArray});
};


