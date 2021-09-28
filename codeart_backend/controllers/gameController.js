const boardLength = 108;

const games = [
  { gameNumber: 0, winningButtons: [ 1, 2, 3, 4] },
  { gameNumber: 1, winningButtons: [ 5, 6, 7, 8] },
  { gameNumber: 2, winningButtons: [ 9, 10, 11, 12 ] },
]



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
  };
 
