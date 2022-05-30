const { Configuration, OpenAIApi } = require("openai");


/// TEXT PARSING FUNCTIONS

// const exampleText = `The Liberty Bell is located in  Philadelphia, Pennsylvania. Please ask more interesting questions.`

// const exampleText = `\n\nI'm sorry, I don't know what you're talking about.`
const exampleText = `I'm sorry, I don't know what you're talking about.`


function wordWrapResponse(text) {

  console.log("text length equals:", text.length);
  const numCharacters = 18;
  let searchCharacter = 18;
  const numRows = Math.round(text.length / 18);
  let formattedText = text;

  function addStr(str, index, stringToAdd){
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
  }
  
  function addWrapSpacing(text, spaces, insertNumber){

    // console.log(spaces, 'this is spaces')
    let newText = text;
    for (let i = 0; i < (spaces - 1); i++) {
      newText = addStr(newText, insertNumber, ' ');
      // console.log(newText);
    }
    formattedText = newText;
    console.log(formattedText  + ' ' + searchCharacter)
  }
  
  
  function addWordBreak(text, searchNumber, originalSearchNumber){

    if (text[searchNumber]){
      if(text[searchNumber] === ' ' && searchNumber !== originalSearchNumber){
        // console.log('break value equals', text[searchNumber])
        const numberOfSpaces = originalSearchNumber - searchNumber;
        addWrapSpacing(text, numberOfSpaces, searchNumber); 
      }
      else{
        searchNumber -=1;
        // console.log('searching at...', searchNumber)
        addWordBreak(text, searchNumber, originalSearchNumber);
      }
  }
}
  
  for (let i = 0; i < numRows; i++) {
    // console.log(numCharacters);
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

  // res.status(200).json({result: req.body.text})

    let dataResponseObject = {body: {text: ''}};

    //BENNOTE: USE "CONTENT-FILTER_ALPHA" VS DAVINCI FOR FILTERING


    const contentType = await openai.createCompletion("content-filter-alpha", {
      prompt: contentFilter(req.body.text),
      temperature: 0.0,
      max_tokens: 1,
      top_p: 0,
      frequency_penalty: 0.5,
      logprobs: 10, 
    });





    /// IF OK, run QUESTION TO OPENAI....
    const response = await openai.createCompletion("text-davinci-002", {
        prompt: marvinPrompt(req.body.text),
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        // logprobs: 10, 
      });

      console.log('data from AI', contentType.data)
      // console.log('data from AI', response.data)
      // console.log('data from AI', response.data.choices[0].logprobs)

      const responseData = response.data.choices[0].text.toUpperCase().trim();
      dataResponseObject.body.text = wordWrapResponse(responseData);
      return dataResponseObject;

      
      // res.status(200).json({ result: response.data.choices[0].text});
      // res.send('ok')



    
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


