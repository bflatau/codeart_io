const fetch = require('node-fetch');

const { Configuration, OpenAIApi } = require("openai");
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app5eTobFcbCN5edO');


/// TEXT PARSING FUNCTIONS
function wordWrapResponse(text) {

  const numCharacters = 18;
  let searchCharacter = 18;
  const numRows = Math.round(text.length / numCharacters);
  let formattedText = text;

  //adds string in a specific location
  function addStr(str, index, stringToAdd){
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
  }

  // calculates spacing and returns a new string
  function addWrapSpacing(text, spaces, insertNumber){
    let newText = text;

    if(spaces === 0 ){
      newText = newText.slice(0, insertNumber) + newText.slice(insertNumber + 1);
      formattedText = newText;
    }
    else{
      for (let i = 0; i < (spaces - 1); i++) {
        newText = addStr(newText, insertNumber, ' ');
      }
      formattedText = newText;
    }
  }
  
  // checks if character at position 18 is a character, if it is, it calculates the length of the word wrap and returns a new string
  function addWordBreak(text, searchNumber, originalSearchNumber){
    // console.log(`searching at position ${searchNumber} with a value of ${text[searchNumber]}`)

    if (text[searchNumber]){
      if(text[searchNumber] === ' '){
        const numberOfSpaces = originalSearchNumber - searchNumber;
        addWrapSpacing(text, numberOfSpaces, searchNumber); 
      }
      else{
        searchNumber -=1;
        addWordBreak(text, searchNumber, originalSearchNumber);
      }
  }
}
  
  for (let i = 0; i < numRows; i++) {
    addWordBreak(formattedText, searchCharacter, searchCharacter)
    searchCharacter += numCharacters;
  }

  return formattedText;
}


/// OPEN AI API CALL /// 

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function isContentSafe(text){

    const moderation = await openai.createModeration({ input: text });

    if(moderation.data.results[0].flagged === false){
        return true
    } else {

      base('AI_INPUTS').create({ //AIRTABLE STUFF
      "QUESTION": text,
      "RESPONSE": "UNSAFE"
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
      // console.log(record.getId());
      });

      return false
    }
}


async function getEmbeddingData(text, res){

  console.log('IM EMBEDDING FUNCTION', text)

  const embeddingValue = await fetch('http://0.0.0.0:5000/embedding', {
    method: 'POST', // or 'PUT'
    body: text,
    })
    .then(response => response.json())
    .catch((error) => {
    console.error('Error:', error);
    });


      base('AI_INPUTS').create({  //AIRTABLE STUFF
        "QUESTION": text,
        "RESPONSE": `${embeddingValue.question.toUpperCase()} * ${embeddingValue.answer}`
        }, function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
        // console.log(record.getId());
        });


    return embeddingValue
}


/// OPEN AI PROMPTS ///


//CONTENT FILTER

const contentFilter =(input)=>{

  return `"<|endoftext|>[${input}]\n--\nLabel:"`
}



/// SCREEN SAVER MESSAGES ///




module.exports = {isContentSafe, wordWrapResponse, getEmbeddingData}


// const example = `I'm sorry, I don't know what you're talking about.`

// function padRight(text, max) {
//   return text + ' '.repeat(max - text.length);
// }

// function redoSpaces(text, rowLength, totalLength) {
//   const words = text.split(' ');
//   const rows = [];
//   let currRow = [];
//   let currRowLength = 0;

//   words.forEach(word => {
//     if ((currRowLength + word.length + 1) <= rowLength) {
//       currRowLength += word.length;
//       currRow.push(word);
//     } else {
//       rows.push(currRow);
//       currRow = [word];
//       currRowLength = word.length;
//     }
//   });
  
//   if (currRow.length) {
//     rows.push(currRow);
//   }

//   const rowsWithSpaces = rows
//     .map(row => row.join(' '))
//     .map(rowAsString => padRight(rowAsString, rowLength));

//   const asString = rowsWithSpaces.join('');
  
//   return padRight(asString, totalLength);
// }

// const redone = redoSpaces(example, 18, 108);
// console.log('redone length', redone.length);
// const visual = redone.replace(/ /g, '^');
// console.log(`-->${visual}<--`);