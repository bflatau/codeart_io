const boardLength = 120;

const games = [
  { gameNumber: 0, winningKeys: [ 1, 10, 41, 50 ] },
  { gameNumber: 1, winningKeys: [ 1, 2, 3, 4, 5 ] },
  { gameNumber: 2, winningKeys: [ 25 ] },
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
  
  function generateResponseArray(){
    const buttonInt = parseInt(req.params.buttonNumber);
    const gameInt = parseInt(req.params.gameNumber);
    const responseArray = [];

    //i values translate to direct board numbers (start at 1 NOT 0!)
    for (let i = 0; i < boardLength; i++){

      if (i === 11 && i === buttonInt && gameInt === 1 ) {
        responseArray.push('X')
      }
      else {
        responseArray.push(1);
      }
       
    }
    return responseArray;
  }

  const responseValue = generateResponseArray();
 
      res.json({'data': responseValue});
      console.log(req.params.buttonNumber);
      console.log(req.params.gameNumber);
};


exports.handleKeyOff = (req, res) => {
  
  function generateResponseArray(){
    const responseArray = [];
    for (let i = 0; i < boardLength; i++){
        responseArray.push(0);
    }
    return responseArray;
  }

  const responseValue = generateResponseArray();
 
      res.json({'data': responseValue});
      console.log(req.params.buttonNumber);
};


