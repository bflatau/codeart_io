const randomWrong = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '{', '}', '|', '[', ']', '\\', '/', ',', '.', '<', '>', '?', '`', ':', '"', '_'];
const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',"$","*","%","&","@","!","?","#"];
const benFlapsMap = {"0":0,"2":12,"4":14,"6":26,"8":28,"9":29,"j":1,"b":2,"m":3,"r":4,"$":5,"v":6,"k":7,"a":8,"e":9,"n":10,"o":11,"*":13,"g":15,"i":16,"%":17,"d":18,"l":19,"&":20,"@":21,"c":22,"w":23,"h":24,"y":25,"q":27,"!":30,"t":31,"z":32,"p":33,"f":34,"?":35,"s":36,"#":37,"u":38,"x":39};
const benRandomWrong = ["2","4","6","8","9"];
const benButtonMap = {"20":48,"21":47,"22":45,"23":46,"24":44,"25":45,"26":42,"27":43,"28":40,"29":41,"30":38,"31":39,"32":36,"33":37,"34":34,"35":35,"36":32,"37":33,"38":30,"39":31,"40":28,"41":29,"42":26,"43":27,"44":24,"45":25,"46":22,"47":23,"48":20,"49":21,"50":18,"51":19,"52":16,"53":17,"54":0,"55":1,"56":2,"57":3,"58":4,"59":5,"60":6,"61":7,"62":8,"63":9,"64":10,"65":11,"66":12,"67":13,"68":14,"69":15};


const levelEditorGameObject = {"buttons":["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],"flaps":[null,"y","a","y",null,"i","t",null,"w","o","r","k","s",null,null,null,null,null,null,"t","h","a","n","k","s",null,"e","v","e","r","y","o","n","e",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"f","o","r",null,"a","l","l",null,"t","h","e",null,"h","a","r","d",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"w","o","r","k",null,null,null,null,null,null,null]}

const gamesList = [

    /// FOUR COLORS | The first bud of spring sings the other seeds into joining her uprising
    {"buttons":["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","b","b","a","a","a","b"],"flaps":[null,null,"t","h","e",null,"f","i","r","s","t",null,"b","u","d",null,null,null,null,null,null,null,null,"o","f",null,null,"s","p","r","i","n","g",null,null,null,null,null,"s","i","n","g","s",null,"t","h","e",null,"o","t","h","e","r",null,null,null,"s","e","e","d","s",null,"i","n","t","o",null,null,null,null,null,null,null,null,"j","o","i","n","i","n","g",null,"h","e","r",null,null,null,null,null,null,null,"u","p","r","i","s","i","n","g",null,null,null,null,null,null,null,null]},

    // & | technology is a useful servant but a dangerous master 
    {"buttons":["off","off","b","off","off","off","b","off","off","off","off","b","off","off","off","b","b","off","off","off","b","off","off","off"],"flaps":["t","e","c","h","n","o","l","o","g","y",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"i","s",null,null,null,"a",null,"u","s","e","f","u","l",null,"s","e","r","v","a","n","t",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"b","u","t",null,null,"a",null,"d","a","n","g","e","r","o","u","s",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"m","a","s","t","e","r"]},

    // ! | the future is here its just not widely distributed yet 
    {"buttons":["off","b","off","off","off","b","off","off","off","off","b","off","off","off","b","off","off","off","off","a","off","off","off","a"],"flaps":[null,"t","h","e",null,"f","u","t","u","r","e",null,"i","s",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"h","e","r","e",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"i","t","s",null,"j","u","s","t",null,"n","o","t",null,null,null,null,null,"w","i","d","e","l","y",null,null,null,null,null,null,null,null,null,null,null,null,null,"d","i","s","t","r","i","b","u","t","e","d",null,"y","e","t",null,null]},

    // $ | if you can control the meaning of words you can control the people who must use them 
    {"buttons":["a","off","off","off","a","off","off","off","off","a","off","off","off","a","off","off","off","off","b","off","off","off","a","off"],"flaps":["i","f",null,"y","o","u",null,"c","a","n",null,"c","o","n","t","r","o","l","t","h","e",null,"m","e","a","n","i","n","g",null,"o","f",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"w","o","r","d","s","y","o","u",null,"c","a","n",null,"c","o","n","t","r","o","l",null,null,null,"t","h","e",null,"p","e","o","p","l","e",null,"w","h","o",null,null,null,null,null,null,null,null,null,"m","u","s","t",null,"u","s","e",null,"t","h","e","m"]},

    // GREEN | when you want to know how things really work study them when theyre coming apart
    {"buttons":["off","off","b","off","off","off","a","a","off","b","off","off","off","b","a","a","off","off","a","off","off","off","a","b"],"flaps":["w","h","e","n",null,"y","o","u",null,"w","a","n","t",null,"t","o",null,null,"k","n","o","w",null,"h","o","w",null,"t","h","i","n","g","s",null,null,null,"r","e","a","l","l","y",null,"w","o","r","k",null,null,null,null,null,null,null,null,null,null,"s","t","u","d","y",null,"t","h","e","m",null,"w","h","e","n",null,null,null,"t","h","e","y","r","e",null,"c","o","m","i","n","g",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"a","p","a","r","t"]},

    // @ | through the machineries of greed pettiness and the abuse of power love occurs 
    {"buttons":["off","off","a","off","off","off","a","off","off","off","off","a","off","off","off","a","a","off","off","off","a","off","off","off"],"flaps":[null,"t","h","r","o","u","g","h",null,"t","h","e",null,null,null,null,null,null,"m","a","c","h","i","n","e","r","i","e","s",null,"o","f",null,null,null,null,null,null,"g","r","e","e","d",null,"p","e","t","t","i","n","e","s","s",null,null,null,"a","n","d",null,"t","h","e",null,"a","b","u","s","e",null,null,null,null,null,"o","f",null,"p","o","w","e","r",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"l","o","v","e",null,"o","c","c","u","r","s"]},

    // * | the norms and notions of what just is isnt always justice 
    {"buttons":["b","off","off","off","b","off","off","off","off","b","off","off","off","b","off","off","off","off","a","off","off","off","b","off"],"flaps":[null,"t","h","e",null,null,"n","o","r","m","s",null,"a","n","d",null,null,null,null,null,null,null,null,null,"n","o","t","i","o","n","s",null,null,null,null,null,null,"o","f",null,null,null,"w","h","a","t",null,"j","u","s","t",null,"i","s",null,"i","s","n","t",null,"a","l","w","a","y","s",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"j","u","s","t","i","c","e"]},
    
    // % | language is to the mind more than light is to the eye 
    {"buttons":["off","a","off","off","off","a","off","off","off","off","a","off","off","off","a","off","off","off","off","b","off","off","off","b"],"flaps":[null,"l","a","n","g","u","a","g","e",null,"i","s",null,"t","o",null,null,null,null,null,null,"t","h","e",null,"m","i","n","d",null,"m","o","r","e",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"t","h","a","n",null,"l","i","g","h","t",null,"i","s",null,null,null,null,null,null,null,null,null,"t","o",null,"t","h","e",null,"e","y","e",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},

    // ? | you can tune a guitar but you cant tuna fish unless you play bass 
    {"buttons":["off","off","off","b","off","off","off","b","b","off","off","off","b","off","off","off","off","b","off","off","off","a","off","off"],"flaps":["y","o","u",null,null,"c","a","n",null,null,"t","u","n","e",null,null,"a",null,null,"g","u","i","t","a","r",null,"b","u","t",null,"y","o","u",null,null,null,"c","a","n","t",null,"t","u","n","a",null,"f","i","s","h",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"u","n","l","e","s","s",null,"o","f",null,"c","o","u","r","s","e",null,null,null,null,null,"y","o","u",null,null,"p","l","a","y",null,"b","a","s","s"]},
    
    // ORANGE | of all the sad words of tongue or pen the saddest are these it might have been
    {"buttons":["off","b","off","off","a","a","off","off","off","off","b","off","a","a","b","off","off","b","off","off","a","a","off","off"],"flaps":["o","f",null,"a","l","l",null,"t","h","e",null,"s","a","d",null,null,null,null,null,"w","o","r","d","s",null,"o","f",null,"t","o","n","g","u","e",null,null,"o","r",null,"p","e","n",null,"t","h","e",null,"s","a","d","d","e","s","t",null,null,null,null,null,"a","r","e",null,"t","h","e","s","e",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"i","t",null,"m","i","g","h","t",null,"h","a","v","e",null,"b","e","e","n"]}
]



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

const shuffleFlapMapping = (game) => {
    const mapping = new Array(108)
    for (let i = 0; i < mapping.length; i++) {
        const buttonForFlap = Math.floor(Math.random() * 24)
        mapping[i] = buttonForFlap
    }
    game.flapToButtonMapping = mapping
}

const hasWon = btnStates => {
    const hasWon = !btnStates.find(btnState => btnState.currentState !== btnState.desiredState);
    console.log('was the game won?', hasWon);
    return hasWon
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

    const forScott = gameState.flaps.map(flapLetter => {
        return flapLetter === null ? 0 : benFlapsMap[flapLetter]
    });

    return {
        ...gameState,
        btnStates: updatedBtns,
        flapStates: updatedFlaps,
        forScott
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

    console.log('is this correct?', isCorrect)
    
    // // Determine how many random things will happen
    // // (currenlty it's the same whther good or bad. you can change this)
    // const numToReveal = getNumToReveal(gameState.flapStates, gameState.btnStates);

    // if (isTurningOff) {
    //     if (currentMatchesDesired) {
    //         // Turned off correct -- remove random correct
    //         gameState.flapStates = removeRandomGood(gameState.flapStates, numToReveal);
    //     } else {
    //         // Turned off incorrect - remove random bad
    //         gameState.flapStates = removeRandomBad(gameState.flapStates, numToReveal);
    //     }
    // } else {
    //     if (currentMatchesDesired) {
    //         // Turned on correct -- add random good
    //         gameState.flapStates = randomGood(gameState.flapStates, numToReveal);
    //     } else {
    //         // Turned on incorrect -- add random bad
    //         gameState.flapStates = newRandomEvil(gameState.flapStates, numToReveal);  
    //     }
    // }
    gameState.flapStates = gameState.flapStates.map((fs) => {
        const buttonState = gameState.btnStates[gameState.flapToButtonMapping[fs.id]]
        
        if (buttonState.currentState === 'off') {
            // Button off - show blank
            return {
                ...fs,
                isRevealed: false,
                randomVal: null,
            }
        } else if (buttonState.currentState == buttonState.desiredState) {
            // Button on and right - show good value
            return {
                ...fs,
                isRevealed: true,
                randomVal: allLetters.indexOf(fs.randomVal) > -1 ? fs.randomVal : randomLetter(),
            }
        } else {
            // Button on and wrong - show bad value
            return {
                ...fs,
                isRevealed: true,
                randomVal: benRandomWrong.indexOf(fs.randomVal) > -1 ? fs.randomVal : randomWrongValue(),
            }
        }
    })

    const forScott = gameState.flapStates.map(fs => {
        const lookupVal = fs.randomVal || (fs.isRevealed && fs.val) || 0;
        return benFlapsMap[lookupVal];
    });

    const newGameState = {
        ...gameState,
        forScott
    };

    // console.log('returning game state', newGameState); /// JIM STUFF

    return newGameState;
}

const buttonDown = (gameState, btnPin) => {
    // Convert Ben's "btnPin" (0-48) to Jim's "boxId" (0-24)
    const boxId = Math.floor(btnPin / 2);
    const isEven = btnPin % 2 === 0;
    const newState = isEven ? 'a' : 'b';

    const jimAction = { id: boxId, state: newState };
    console.log(`btnPin ${btnPin} DOWN converted to: ${JSON.stringify(jimAction)}`)

    return doItAll(gameState, jimAction);
}
const buttonUp = (gameState, btnPin) => {
    // Convert Ben's "btnPin" (0-48) to Jim's "boxId" (0-24)
    const boxId = Math.floor(btnPin / 2);

    const jimAction = { id: boxId, state: 'off' };
    // console.log(`btnPin ${btnPin} UP converted to: ${JSON.stringify(jimAction)}`)

    return doItAll(gameState, jimAction);
}

const initialGameStateObject = convertToState(levelEditorGameObject);

module.exports = {buttonUp, buttonDown, convertToState, gamesList, initialGameStateObject, shuffleFlapMapping}