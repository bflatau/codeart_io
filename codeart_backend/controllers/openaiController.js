const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function getResponse (req, res){

  // res.status(200).json({result: req.body.text})

    let dataResponseObject = {body: {text: ''}};

    const response = await openai.createCompletion("text-davinci-002", {
        prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: ${req.body.text}\nMarv:`,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      console.log('data from AI', response.data)
      dataResponseObject.body.text = response.data.choices[0].text.toUpperCase();
      return dataResponseObject;

      
      // res.status(200).json({ result: response.data.choices[0].text});
      // res.send('ok')



    
}



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


