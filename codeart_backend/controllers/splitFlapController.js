const randomWrong = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '{', '}', '|', '[', ']', '\\', '/', ',', '.', '<', '>', '?', '`', ':', '"', '_'];
const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const benFlapsMap = {"0":0,"2":12,"4":14,"6":26,"8":28,"9":29,"j":1,"b":2,"m":3,"r":4,"$":5,"v":6,"k":7,"a":8,"e":9,"n":10,"o":11,"*":13,"g":15,"i":16,"%":17,"d":18,"l":19,"&":20,"@":21,"c":22,"w":23,"h":24,"y":25,"q":27,"!":30,"t":32,"z":32,"p":33,"f":34,"?":35,"s":36,"#":37,"u":38,"x":39};
const benRandomWrong = ["2","4","6","8","9","$","*","%","&","@","!","?","#"];
const benButtonMap = {"20":48,"21":47,"22":45,"23":46,"24":44,"25":45,"26":42,"27":43,"28":40,"29":41,"30":38,"31":39,"32":36,"33":37,"34":34,"35":35,"36":32,"37":33,"38":30,"39":31,"40":28,"41":29,"42":26,"43":27,"44":24,"45":25,"46":22,"47":23,"48":20,"49":21,"50":18,"51":19,"52":16,"53":17,"54":0,"55":1,"56":2,"57":3,"58":4,"59":5,"60":6,"61":7,"62":8,"63":9,"64":10,"65":11,"66":12,"67":13,"68":14,"69":15};


const levelEditorGameObject = {"buttons":["a","a","a","a","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off"],"flaps":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"h","e","l","l","o",null,"t","h","e","r","e",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}





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
            return { id, val, matters: val !== null, isRevealed: false, pos: 0 }
        });

    const forScott = flapStates.map(fs => 0);

    return {
        ...game,
        btnStates,
        flapStates,
        forScott,
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
    // return randomItemsFromArray(randomWrong, 1)[0];
    return randomItemsFromArray(benRandomWrong, 1)[0];
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
const doItAll = (gameState, action) => {
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

    const forScott = gameState.flapStates.map(fs => {
        const lookupVal = fs.randomVal || (fs.isRevealed && fs.val) || 0;
        return benFlapsMap[lookupVal];
    });

    const newGameState = {
        ...gameState,
        forScott
    };

    console.log('returning game state', newGameState);

    return newGameState;
}

const buttonDown = (gameState, btnPin) => {
    // Convert Ben's "btnPin" (0-48) to Jim's "boxId" (0-24)
    const boxId = Math.floor(btnPin / 2);
    const isEven = boxId % 2 === 0;
    const newState = isEven ? 'a' : 'b';

    const jimAction = { id: boxId, state: newState };
    console.log(`btnPin ${btnPin} DOWN converted to: ${jimAction}`)

    return doItAll(gameState, jimAction);
}
const buttonUp = (gameState, btnPin) => {
    // Convert Ben's "btnPin" (0-48) to Jim's "boxId" (0-24)
    const boxId = Math.floor(btnPin / 2);

    const jimAction = { id: boxId, state: 'off' };
    console.log(`btnPin ${btnPin} UP converted to: ${jimAction}`)

    return doItAll(gameState, jimAction);
}

const initialGameStateObject = convertToState(levelEditorGameObject);

module.exports = {buttonUp, buttonDown, initialGameStateObject}