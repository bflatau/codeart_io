const { Configuration, OpenAIApi } = require("openai");


/// TEXT PARSING FUNCTIONS

// const exampleText = `The Liberty Bell is located in  Philadelphia, Pennsylvania. Please ask more interesting questions.`

const exampleText = `Im sorry I dont know what youre talking about`

// 'PLEASE ASK ANOTHER QUESTION RESULTS MAY BE UNSAFE FOR ALL AGES'

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
      formattedText = text;
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

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function getResponse (req, res){

    let dataResponseObject = {body: {text: ''}};

    const contentType = await openai.createCompletion("content-filter-alpha", {
      prompt: contentFilter(req.body.text),
      temperature: 0.0,
      max_tokens: 1,
      top_p: 0,
      frequency_penalty: 0.5,
      logprobs: 10, 
    });

    if(contentType.data.choices[0].text === '0'){
      /// IF OK, run QUESTION TO OPENAI....
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: marvinPrompt(req.body.text),
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      // console.log('data from AI', response.data)

      const responseData = response.data.choices[0].text.toUpperCase().trim();
      const formattedResponseData = responseData.replace(/\n/g, " ");

      dataResponseObject.body.text = wordWrapResponse(formattedResponseData);
      return dataResponseObject;
    }

    
    else{
      dataResponseObject.body.text = 'UNSAFE';
      return dataResponseObject;
    }
}


/// OPEN AI PROMPTS ///


const contentFilter =(input)=>{

  return `"<|endoftext|>[${input}]\n--\nLabel:"`
}

const marvinPrompt = (input) =>{

  return `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\n
          You: How many pounds are in a kilogram?\n
          Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\n
          You: What does HTML stand for?\n
          Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\n
          You: When did the first airplane fly?\n
          Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\n
          You: What is the meaning of life?\n
          Marv: I’m not sure. I’ll ask my friend Google.\n
          You: ${input}\n
          Marv:`

}



/// SCREEN SAVER MESSAGES ///

const helloMessageArray =  [
    // Ask me a question I know lots of things
  [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0
    ],
    [
      0,  8, 36,  7,  0, 3,  9,
      0,  8,  0, 27, 38, 9, 36,
      31, 16, 11, 10
    ],
    [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0
    ],
    [
      0,  0,  0,  0, 0, 16,  0,
      7, 10, 11, 23, 0, 19, 11,
      31, 36,  0,  0
    ],
    [
      0, 0, 11, 34,  0,  0,  0,
      0, 0, 31, 24, 16, 10, 15,
      36, 0,  0,  0
    ],
    [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0
    ]
  ]









module.exports = {getResponse, helloMessageArray, wordWrapResponse }


// const example = `I'm sorry, I don't know what you're talking about.`

function padRight(text, max) {
  return text + ' '.repeat(max - text.length);
}

function redoSpaces(text, rowLength, totalLength) {
  const words = text.split(' ');
  const rows = [];
  let currRow = [];
  let currRowLength = 0;

  words.forEach(word => {
    if ((currRowLength + word.length + 1) <= rowLength) {
      currRowLength += word.length;
      currRow.push(word);
    } else {
      rows.push(currRow);
      currRow = [word];
      currRowLength = word.length;
    }
  });
  
  if (currRow.length) {
    rows.push(currRow);
  }

  const rowsWithSpaces = rows
    .map(row => row.join(' '))
    .map(rowAsString => padRight(rowAsString, rowLength));

  const asString = rowsWithSpaces.join('');
  
  return padRight(asString, totalLength);
}

// const redone = redoSpaces(example, 18, 108);
// console.log('redone length', redone.length);
// const visual = redone.replace(/ /g, '^');
// console.log(`-->${visual}<--`);