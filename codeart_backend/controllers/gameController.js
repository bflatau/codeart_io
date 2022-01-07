const flaps = [
  0,      // BLACK
  'J',    // 1
  'B',    // 2
  'M',    // 3
  'R',    // 4
  '$',    // 5
  'V',    // 6
  'K',    // 7
  'A',    // 8
  'E',    // 9
  'N',    // 10
  'O',    // 11
  12,     // YELLOW
  '*',    // 13
  14,     // GREEN
  'G',    // 15
  'I',    // 16
  '%',    // 17
  'D',    // 18
  'L',    // 19
  '&',    // 20
  '@',    // 21
  'C',    // 22
  'W',    // 23
  'H',    // 24
  'Y',    // 25
  26,     // WHITE
  'Q',    // 27
  28,     // PINK
  29,     // ORANGE
  '!',    // 30
  'T',    // 31
  'Z',    // 32
  'P',    // 33
  'F',    // 34
  '?',    // 35
  'S',    // 36
  '#',    // 37
  'U',    // 38
  'X'     // 39
]


// BEN NOTES // 
//I converted random and correct letters to their IDs in the array, I'm keeping [0] (black) out of this for now as it's a special condition

const generateAllLetters = (array) =>{
  let filteredArray = array;
  for(var i = randomWrong.length -1; i>=0; i--){
      filteredArray.splice(randomWrong[i], 1);
  }
  return filteredArray;
}

const numberOfFlapsPerModule =  Array.from(Array(40).keys());   // 0-39 ids of all flap positions
// const randomWrong = [0, 5, 12, 13, 14, 17, 20, 21];                // "incorrect" values //need something special for 0 ('black') or else the code breaks on startup
const randomWrong = [0, 1 , 2, 3 ,4 ,5, 6, 7, 8, 9, 10];                // "incorrect" values //need something special for 0 ('black')
let allLetters = generateAllLetters(numberOfFlapsPerModule);    // cull incorrect values from all ids 
let flapBoardState = Array(108).fill(0);


const games = [
  {   gameNumber: 0, 
      winningButtons: [ 1, 2, 3, 4, 5, 6 ], 
      winningValue: 'X' 
  },
  { gameNumber: 1, winningButtons: [ 46, 47, 48, 49, 50 ], winningValue: 'Y' },
  { gameNumber: 2, winningButtons: [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ], winningValue: 'Z' },
]


exports.handleButtonOn = (buttonID, gameNumber, currentFlapBoardState) => {
 
  const correctButtonPressed = games[gameNumber].winningButtons.includes(buttonID);
  const correctButtons = games[gameNumber].winningButtons;
  // const searchValue = games[gameNumber].winningValue;
  const searchValue = allLetters;
  // const numberOfResults = (currentFlapBoardState.length / correctButtons.length); // this needs to map to the correct puzzle
  const numberOfResults = 5; // this needs to map to the correct puzzle


  function getRandomInputResponses (){
    const takenIndexes = [];
    let outputBoardArray = currentFlapBoardState.slice();
  
    //loop through initial board array and identify which winning values are taken and send to an array//
    for (i = 0; i < currentFlapBoardState.length; i++){
      if (searchValue.includes(currentFlapBoardState[i])){
        takenIndexes.push(i);
      }
    }
  
    //loop for the number of new winning values to be added, identify random indices, check that they are unique
    // and then add them the array of taken indices, if not unique, generate a new number and try again
    for (i = 0; i < numberOfResults; i++){
      let randomIndex = Math.floor(Math.random() * currentFlapBoardState.length);
  
      findUnique(randomIndex);
  
      function findUnique(randomValue){
        // console.log(searchValue)
        // console.log(randomValue)
        // console.log(searchValue.includes(randomValue))
        // console.log(outputBoardArray[randomValue])
        console.log(searchValue[Math.floor(Math.random() * searchValue.length)] );
        if (!searchValue.includes(outputBoardArray[randomValue])){ 

          (correctButtonPressed) ? outputBoardArray[randomValue] = searchValue[Math.floor(Math.random() * searchValue.length)] :
          outputBoardArray[randomValue] = randomWrong[Math.floor(Math.random() * randomWrong.length)]; // the needs to NOT be in the searchValue array!!!
        }
        else{
          let otherRandomIndex = Math.floor(Math.random() * currentFlapBoardState.length);
          findUnique(otherRandomIndex);
        }
      }   
      
    }
    return outputBoardArray;
  }

  return getRandomInputResponses()  
};


console.log(this.handleButtonOn(1, 0, flapBoardState))



exports.handleButtonOff = (buttonID) => {

  const buttonInt = parseInt(req.params.buttonNumber);
  const gameInt = parseInt(req.params.gameNumber);
  const requestBoardArray = req.body.boardArray.data;
  const magicButtonPressed = games[gameInt].winningKeys.includes(buttonInt);
  const magicButtons = games[gameInt].winningKeys;
  const searchValue = games[gameInt].winningValue;
  const numberOfResults = (requestBoardArray.length / magicButtons.length);

  
  function getRandomInputResponses (){

    if (!magicButtonPressed){
      return requestBoardArray
    }

    else{

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
          if (outputBoardArray[randomValue] === searchValue){

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
  }

  res.json({'data': getRandomInputResponses()});  
};

