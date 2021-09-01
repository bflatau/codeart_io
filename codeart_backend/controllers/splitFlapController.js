var XLSX = require('xlsx');
const fs = require('fs');





///SETUP XLSX READER
var buffer = fs.readFileSync("../code_art.xlsx");
var workbook = XLSX.read(buffer, {type:'buffer'});



var keys = Object.keys(workbook.Sheets['game_2']);//GETS KEY VALUES OF EACH SHEET [A1, G4, E6]...etc
// console.log(keys)

keys.forEach((key) => {
    console.log(workbook.Sheets['game_2'][key].v) ///GETS VALUES ASSOCIATED WITH EACH KEY [B, E, N]...etc
})



// B2 - S2
// B3 - S3 
// B4 - S4 
// B5 - S5 
// B6 - S6 
// B7 - S7 


const splitFlapModules = {  
    
    'B2': 1, 'C2': 2, 'D2': 3, 'E2': 0, 'F2': 0, 'G2': 0, 'H2': 0, 'I2': 0, 'J2': 0, 'K2': 0, 'L2': 0, 'M2': 0, 'N2': 0, 'O2': 0, 'P2': 0, 'Q2': 4, 'R2': 5, 'S2': 6,
    


};

console.log(splitFlapModules['G2'], 'hello')

let benTest = [];

for (const value in splitFlapModules) {

    benTest.push(splitFlapModules[value])
  }

  console.log(benTest)

const flaps = [
    0, //BLACK
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
    12, // yellow
    '*',
    14, // green
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
    26, // white
    'Q',
    28, // red
    29, // orange
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




///SPLIT FLAP FUNCTION

//ACCEPTS AN ARRAY (ON BOXES) & TESTS IF GAME WINNING CONDITIONS ARE MET





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