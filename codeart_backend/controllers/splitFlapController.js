// BEN NOTES //
//the flaps are physically fixed in their position, on update, we need to tell Scott's controller what position (id in the array) to go to

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
const randomWrong = [5, 12, 13, 14, 17, 20, 21];                // "incorrect" values
let allLetters = generateAllLetters(numberOfFlapsPerModule);    // cull incorrect values from all ids 
let splitFlapBoard = Array(108);

const sampleAction = { 
    id: 1,            // id 
    state: 'a'        // what the user settled on, which should update the game
};
const sampleBtn = {
    id: 5,             // id
    currentState: 'a', // what it currently is
    desiredState: 'c'  // what we want it to be to win
};
const sampleFlap = {
    id: 4,             // id
    value: 'F',        // value to show
    randomVal: null,
    matters: true,     // it's a
    isRevealed: false  // is being shown
};

/**
 * Takes flapStates and randomly reveals the specified numToReveal
 */
const randomGood = (flapStates, numToReveal) => {
    // don't touch these
    const dontMatterFlaps = flapStates.filter(fs => !fs.matters);
    const mattersFlaps = flapStates.filter(fs => fs.matters);

    // don't touch these either
    const mattersRevealed = mattersFlaps.filter(fs => fs.isRevealed);
    
    // our pool of revealable flaps
    const mattersToReveal = mattersFlaps.filter(fs => !fs.isRevealed);
    
    const toReveal = mattersToReveal.filter(fs => !fs.isRevealed);
    const toRevealShuff = shuffle(toReveal);
    const toUpdate = toRevealShuff.slice(0, numToReveal);
    const toLeave = toRevealShuff.slice(numToReveal);
    const updated = toUpdate.map(fs => {
        return {
            ...fs,
            isRevealed: true,
            randomVal: randomLetter()
        };
    });

    const reassembled = dontMatterFlaps
        .concat(mattersRevealed)
        .concat(toLeave)
        .concat(updated)
    const reassembledSorted = sortFlaps(reassembled);

    return reassembledSorted;
}

const removeRandomGood = (flapStates, numToReveal) => {
    const unrevealed = flapStates.filter(fs => !fs.isRevealed);
    const revealed = flapStates.filter(fs => fs.isRevealed);
    const revealedShuffled = shuffle(revealed);
    const revealedUnchanged = revealedShuffled.slice(numToReveal);
    const revealedToRandom = revealedShuffled.slice(0, numToReveal)
        .map(fs => {
            return {
                ...fs,
                isRevealed: false,
                randomVal: randomWrongValue()
            };
        });

    const reassembled = unrevealed
        .concat(revealedUnchanged)
        .concat(revealedToRandom);

    const reassembledSorted = sortFlaps(reassembled);

    return reassembledSorted;
}

const newRandomEvil = (flapStates, numToReveal) => {
    // don't touch these
    const dontMatterFlaps = flapStates.filter(fs => !fs.matters);
    const mattersFlaps = flapStates.filter(fs => fs.matters);

    // don't touch these either
    const mattersRevealed = mattersFlaps.filter(fs => fs.isRevealed);
    
    // our pool of revealable flaps
    const mattersToReveal = mattersFlaps.filter(fs => !fs.isRevealed)

    // If there's nothing left to reveal, but the game isn't won
    // we must need to randomize something that's already been revealed
    // and correct. They must have all the correct buttons in position
    // AND also some additional wrong ones
    if (!mattersToReveal.length) {
        return removeRandomGood(flapStates, numToReveal);
    }

    const toRevealShuff = shuffle(mattersToReveal);
    const toUpdate = toRevealShuff.slice(0, numToReveal);
    const toLeave = toRevealShuff.slice(numToReveal);
    const updated = toUpdate.map(fs => {
        return {
            ...fs,
            randomVal: randomWrongValue()
        };
    });

    const reassembled = dontMatterFlaps
        .concat(mattersRevealed)
        .concat(toLeave)
        .concat(updated)
    const reassembledSorted = sortFlaps(reassembled);

    return reassembledSorted;
}

const hasWon = btnStates => {
    return !btnStates.find(btnState => btnState.currentState !== btnState.desiredState);
}

const hasReset = btnStates => !btnStates.find(bs => bs.currentState !== 'off');

// Takes the "generated game" from the level editor and converts it to
// the live "gameState" object we'll use to track state
const convertToState = game => {
    const btnStates = game.buttons
        .map((state, id) => {
            return { id, currentState: 'off', desiredState: state };
        });
    const flapStates = game.flaps
        .map((val, id) => {
            return { id, val, matters: val !== null, isRevealed: false }
        });

    return {
        ...game,
        btnStates,
        flapStates,
    };
}

const sortFlaps = flapStates => {
    flapStates.sort((a, b) => a.id - b.id);
    return flapStates;
}

const getNumToReveal = (flapStates, btnStates) => {
    const numOfBtns = countOfBtns(btnStates);
    return Math.floor(countOfMatters(flapStates) / numOfBtns);
}

const countOfCorrectBtns = (btnStates) => btnStates.filter(bs.currentState === bs.desiredState).length;

const countOfMatters = flapStates => {
    return flapStates.filter(flapState => flapState.matters).length;
}

const countOfRevealed = flapStates => {
    return flapStates.filter(flapState => flapState.isRevealed && flapState.matters).length;
}

const countOfUnrevealed = flapStates => {
    return countOfMatters(flapStates) - countOfRevealed(flapStates);
}

const countOfBtns = btnStates => {
    return btnStates.filter(btnState => btnState.desiredState !== 'off').length;
}

const shuffle = arr => arr
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

const randomItemsFromArray = (arr, numberOfItems) => {
    return shuffle(arr).slice(0, numberOfItems);
}

const randFromOneToMax = max => Math.floor(Math.random() * max) + 1;

const randomWrongValue = () => {
    return randomItemsFromArray(randomWrong, 1)[0];
}

const randomLetter = () => {
    return randomItemsFromArray(allLetters, 1)[0];
}

const convertToWon = gameState => {
    const updatedBtns = gameState.btnStates.map(btnState => {
        return {
            ...btnState,
            currentState: btnState.desiredState
        };
    });

    const updatedFlaps = gameState.flapStates.map(flapState => {
        return {
            ...flapState,
            val: flapState.matters ? flapState.val : null,
            isRevealed: flapState.matters,
            randomVal: null
        };
    });

    return {
        ...gameState,
        btnStates: updatedBtns,
        flapStates: updatedFlaps
    };
}

/**
 *  This function does "it all" (lol) meaning it takes the entire current state
 *  (before user's action is applied) and then applies the user's action, updates
 *  the entire state obj accordingly and returns it.
 */
export const doItAll = (gameState, action) => {
    // Apply the user's action to the state obj
    gameState.btnStates[action.id].currentState = action.state;

    // Short-circuit if it's been reset
    if (hasReset(gameState.btnStates)) {
        return convertToState(gameState);
    }

    // Short-circuit if it's solved
    if (hasWon(gameState.btnStates)) {
        return convertToWon(gameState);
    }

    // See if it was right or wrong
    const alreadyTriggered = gameState.btnStates[action.id].triggered === true;
    const currentMatchesDesired = gameState.btnStates[action.id].currentState === gameState.btnStates[action.id].desiredState;
    const isTurningOff = action.state === 'off';
    const isCorrect = currentMatchesDesired && !isTurningOff;
    
    // Determine how many random things will happen
    // (currenlty it's the same whther good or bad. you can change this)
    const numToReveal = getNumToReveal(gameState.flapStates, gameState.btnStates);

    if (isCorrect) {
        if (!alreadyTriggered) {
            gameState.btnStates[action.id].triggered = true;
        }
        // random good!
        // reveal random meaningful characters
        gameState.flapStates = randomGood(gameState.flapStates, numToReveal);
    } else {
        // random evil!
        if (alreadyTriggered) {
            // remove random correct characters and add random bad ones
            gameState.flapStates = removeRandomGood(gameState.flapStates, numToReveal);
        }
        gameState.flapStates = newRandomEvil(gameState.flapStates, numToReveal);     
    }

    console.log('returning gameState', gameState);
    return gameState;
}


export const generateFlaps = () =>{

    let flaps = 'ben'

    return flaps
}

//buttons == an array of the winning buttons state
// buttons = ["a", "off", "b", "a"]

//flaps == an array of the winning flap state
// flaps = [null, "B", "E", null, "N"]

/// btnState = an array of the current button state ///
// btnState = [{id: 0, currentState: 'a', desiredState: 'a', triggered: true}, {id: 1, currentState: 'off', desiredState: 'off'}]
// state can be 'a', 'b', 'off'


// flapState = current flap state
// is an array = [{id: 0, val: null, matters: false, isRevealed: false},{id: 1, val: null, matters: false, isRevealed: false}]



















/// OLD STUFF ///


var XLSX = require('xlsx');
// const fs = require('fs');


// ///SETUP XLSX READER
// var buffer = fs.readFileSync("../code_art.xlsx");
// var workbook = XLSX.read(buffer, {type:'buffer'});



// var keys = Object.keys(workbook.Sheets['game_2']);//GETS KEY VALUES OF EACH SHEET [A1, G4, E6]...etc
// // console.log(keys)

// keys.forEach((key) => {
//     console.log(workbook.Sheets['game_2'][key].v) ///GETS VALUES ASSOCIATED WITH EACH KEY [B, E, N]...etc
// })



// // B2 - S2
// // B3 - S3 
// // B4 - S4 
// // B5 - S5 
// // B6 - S6 
// // B7 - S7 


// const splitFlapModules = {  
    
//     'B2': 1, 'C2': 2, 'D2': 3, 'E2': 0, 'F2': 0, 'G2': 0, 'H2': 0, 'I2': 0, 'J2': 0, 'K2': 0, 'L2': 0, 'M2': 0, 'N2': 0, 'O2': 0, 'P2': 0, 'Q2': 4, 'R2': 5, 'S2': 6,
    


// };

// console.log(splitFlapModules['G2'], 'hello')

// let benTest = [];

// for (const value in splitFlapModules) {

//     benTest.push(splitFlapModules[value])
//   }

//   console.log(benTest)

// const flaps = [
//     0, //BLACK
//     'J',
//     'B',
//     'M',
//     'R',
//     '$',
//     'V',
//     'K',
//     'A',
//     'E',
//     'N',
//     'O',
//     12, // yellow
//     '*',
//     14, // green
//     'G',
//     'I',
//     '%',
//     'D',
//     'L',
//     '&',
//     '@',
//     'C',
//     'W',
//     'H',
//     'Y',
//     26, // white
//     'Q',
//     28, // red
//     29, // orange
//     '!',
//     'T',
//     'Z',
//     'P',
//     'F',
//     '?',
//     'S',
//     '#',
//     'U',
//     'X'
// ]





// var firstSheet = workbook.SheetNames[0];

// console.log(firstSheet) /// outputs sheet name

// console.log(workbook.Sheets['game_1'])


// var first_sheet_name = workbook.SheetNames[0];
// var address_of_cell = 'A1';

// /* Get worksheet */
// var worksheet = workbook.Sheets[first_sheet_name];

// /* Find desired cell */
// var desired_cell = worksheet[address_of_cell];

// /* Get the value */
// var desired_value = (desired_cell ? desired_cell.v : undefined);