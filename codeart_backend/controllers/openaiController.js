const { Configuration, OpenAIApi } = require("openai");


/// TEXT PARSING FUNCTIONS

// const exampleText = `Was Google too busy hhhhhhhhhhhh`
const exampleText = `Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.`


// Was Google too AAA busy? Hypertext Markup Language. The T is for try to ask better questions in the future. 18
// Was Google tooAAAA busy? HypertextAA Markup Language. The T is for try to ask better questions in the future. 36
// Was Google tooAAAA busy? HypertextAA Markup Language. The T is for try to ask better questions in the future. 54
// Was Google tooAAAA busy? HypertextAA Markup Language. The T is for tryAA to ask better questions in the future. 72
// Was Google tooAAAA busy? HypertextAA Markup Language. The T is for tryAA to ask better questions in theAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA future.






const wordWrapResponse = (text)=> {

  console.log(text.length);

  const numRows = Math.round(text.length / 18);
  console.log(numRows);
  let numCharacters = 18;
  let formattedText = text;

  function addStr(str, index, stringToAdd){
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
  }
  
  function addWrapSpacing(text, spaces, insertNumber){
    let newText = text;
    for (let i = 0; i < spaces; i++) {
      newText = addStr(newText, insertNumber, ' ');
    }
    formattedText = newText;
    // console.log(formattedText)
  }
  
  
  function addWordBreak(text, searchNumber, originalSearchNumber){

    if (text[searchNumber]){
      if(text[searchNumber] === ' ' && searchNumber !== originalSearchNumber){
        // console.log('break value equals', searchNumber)
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
    addWordBreak(formattedText, numCharacters, numCharacters)
    numCharacters += numCharacters;
  }

  return formattedText;
}

console.log(wordWrapResponse(exampleText));


/// OPEN AI API CALL /// 

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function getResponse (req, res){

  // res.status(200).json({result: req.body.text})

    let dataResponseObject = {body: {text: ''}};

    const response = await openai.createCompletion("text-davinci-002", {
        prompt: marvinPrompt(req.body.text),
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      console.log('data from AI', response.data)

      const responseData = response.data.choices[0].text.toUpperCase();
      dataResponseObject.body.text = wordWrapResponse(responseData, 3, 18);
      return dataResponseObject;

      
      // res.status(200).json({ result: response.data.choices[0].text});
      // res.send('ok')



    
}


/// OPEN AI PROMPTS ///

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









module.exports = {getResponse, helloMessageArray}


