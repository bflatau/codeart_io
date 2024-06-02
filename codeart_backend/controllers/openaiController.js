const fetch = require('node-fetch');

// const { Configuration, OpenAIApi } = require("openai");
const { OpenAI } = require("openai");
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

// console.log(wordWrapResponse(exampleText));





/// OPEN AI API CALL /// 

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const openai = new OpenAI();


async function isContentSafe(text){

  
    const moderation = await openai.moderations.create({ input: text});
    let isContentSafe = true;

    console.log('this is text', text)

    //BENDO: log this + flagged to airtable

    for (let [key, value] of Object.entries(moderation.results[0].category_scores)) {
    
      if(value > .01){
          console.log('BAD!', key, value)
          isContentSafe = false;
      }
      else{
          console.log('GOOD', key, value)
      }
  }

    return isContentSafe
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

///// RESULTS FOR 'SHIT" ////


// [
//   {
//     flagged: false,
//     categories: {
//       sexual: false,
//       hate: false,
//       harassment: false,
//       'self-harm': false,
//       'sexual/minors': false,
//       'hate/threatening': false,
//       'violence/graphic': false,
//       'self-harm/intent': false,
//       'self-harm/instructions': false,
//       'harassment/threatening': false,
//       violence: false
//     },
//     category_scores: {
//       sexual: 0.0041269343346357346,
//       hate: 0.0010784956393763423,
//       harassment: 0.024067554622888565,
//       'self-harm': 0.000004276935669622617,
//       'sexual/minors': 0.0000236355081142392,
//       'hate/threatening': 4.548662602132936e-8,
//       'violence/graphic': 0.000016078376575023867,
//       'self-harm/intent': 0.0000054639849622617476,
//       'self-harm/instructions': 1.6618362508324935e-7,
//       'harassment/threatening': 0.000008727381100470666,
//       violence: 0.00001810787398426328
//     }
//   }
// ]

//// RESULTS FOR 'BALLSACK' ////

// [
//   {
//     flagged: false,
//     categories: {
//       sexual: false,
//       hate: false,
//       harassment: false,
//       'self-harm': false,
//       'sexual/minors': false,
//       'hate/threatening': false,
//       'violence/graphic': false,
//       'self-harm/intent': false,
//       'self-harm/instructions': false,
//       'harassment/threatening': false,
//       violence: false
//     },
//     category_scores: {
//       sexual: 0.011476978659629822,
//       hate: 0.00000393233631257317,
//       harassment: 0.0016001604963093996,
//       'self-harm': 0.00006577068415936083,
//       'sexual/minors': 0.000021520176233025268,
//       'hate/threatening': 3.293188512998313e-7,
//       'violence/graphic': 0.00001231764690601267,
//       'self-harm/intent': 0.000052426061301957816,
//       'self-harm/instructions': 0.000004511527095019119,
//       'harassment/threatening': 0.00006241505616344512,
//       violence: 0.0012422570725902915
//     }
//   }
// ]