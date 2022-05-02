const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function getResponse (res){

    const response = await openai.createCompletion("text-davinci-002", {
        prompt: "Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: Why are we?\nMarv:",
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

    //   console.log(response.data.choices[0].text)
    //   res.send('ok')

      res.status(200).json({ result: response.data.choices[0].text});
    
}


module.exports = {getResponse}



// export default async function (req, res) {
//     const completion = await openai.createCompletion("text-davinci-002", {
//       prompt: generatePrompt(req.body.animal),
//       temperature: 0.6,
//     });
//     res.status(200).json({ result: completion.data.choices[0].text });
//   }
  
//   function generatePrompt(animal) {
//     const capitalizedAnimal =
//       animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//     return `Suggest three names for an animal that is a superhero.
  
//   Animal: Cat
//   Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
//   Animal: Dog
//   Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
//   Animal: ${capitalizedAnimal}
//   Names:`;
//   }