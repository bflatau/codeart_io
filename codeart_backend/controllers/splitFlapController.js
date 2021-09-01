// const splitFlapModules = 108; // 6 x 18

const flapRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const numberOfRows = 6;

const flaps = [
    'black',
    'J',
    'B',
    'M',
    'R',
    '$',
    'V',
    'K',
    'A',
    'E',
    'N',
    'O',
    'yellow',
    '*',
    'green',
    'G',
    'I',
    '%',
    'D',
    'L',
    '&',
    '@',
    'C',
    'W',
    'H',
    'Y',
    'white',
    'Q',
    'red',
    'orange',
    '!',
    'T',
    'Z',
    'P',
    'F',
    '?',
    'S',
    '#',
    'U',
    'X'
]

const games = [
  { gameNumber: 0, winningButtons: [ 1, 2, 3, 4] },
  { gameNumber: 1, winningButtons: [ 5, 6, 7, 8] },
  { gameNumber: 2, winningButtons: [ 9, 10, 11, 12 ] },
]


///SPLIT FLAP FUNCTION

//ACCEPTS AN ARRAY (ON BOXES) & TESTS IF GAME WINNING CONDITIONS ARE MET

console.log(flaps.length);