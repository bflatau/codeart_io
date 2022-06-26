const localURL ='http://0.0.0.0:8090/openai';
const proxyURL = 'https://aa76-2600-1700-dd90-4c80-8007-8600-2c76-c02.ngrok.io/openai';
const serverURL = 'http://solaire:8090/openai';


function handleKeyPress(event) {
    if (event.key == 'Enter') {
        // event.preventDefault();
        console.log('enter pressed');
        const submittedText = document.getElementById("input-field").value;  
        // const aiEngine = document.getElementById("ai-games").value; // turn back on for options
        const aiEngine = 'embedding';

        console.log(aiEngine);
        pollOpenAi(submittedText, aiEngine);
        // document.getElementById("input-field").blur();
        document.getElementById("input-field").value = '';
        // return false;

       
    }
}

const instructionText = document.getElementById("instruction-text");
// document.getElementById("ai-games").addEventListener("click",updateInstructions); //re-enable for toggle

const marvinText = "Ask me a question in the text box below 👇";
const twoSentenceText = "Name a real or fictional person or character in the text box below 👇"
const embeddingText = "REVERSE JEOPARDY! Ask me a question and I'll give you the answer"


// instructionText.innerText = embeddingText; // turn back on for options



function updateInstructions(){
    var e = document.getElementById("ai-games");
    if("marvin" === e.options[e.selectedIndex].value){ 
        instructionText.innerText = marvinText;
    }
    if("two_sentences" === e.options[e.selectedIndex].value){ 
        instructionText.innerText = twoSentenceText;
    }
    if("embedding" === e.options[e.selectedIndex].value){ 
        instructionText.innerText = embeddingText;
    }
}






function pollOpenAi(inputText, aiEngine){

    const data = JSON.stringify({text: inputText.toUpperCase(), ai: aiEngine});

    fetch(localURL, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        document.getElementById("response-text").innerHTML = data.result 

        })
        .catch((error) => {
        console.error('Error:', error);
        });

}


// async function pollOpenAi(inputText){


//     const response = await fetch('http://0.0.0.0:8090/splitflap/set_flaps', {
//          method: 'POST', // or 'PUT'
//          headers: {
//              'Content-Type': 'application/json',
//          },
//          body: benTest,
//          })
//          .then(response => response.json())
//          .then(data => {
//          console.log('Success:', data);
//          })
//          .catch((error) => {
//          console.error('Error:', error);
//          });
 
//          return response
//  }
 








// async function getResponse (res){

//     const response = await openai.createCompletion("text-davinci-002", {
//         prompt: "Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: Why are we?\nMarv:",
//         temperature: 0.5,
//         max_tokens: 60,
//         top_p: 0.3,
//         frequency_penalty: 0.5,
//         presence_penalty: 0,
//       });

//     //   console.log(response.data.choices[0].text)
//     //   res.send('ok')

//       res.status(200).json({ result: response.data.choices[0].text});
    
// }



// async function pollOpenAi(inputText){

//     const response = await fetch('http://0.0.0.0:8090/splitflap/set_flaps', {
//          method: 'POST', // or 'PUT'
//          headers: {
//              'Content-Type': 'application/json',
//          },
//          body: {text: 'hello'},
//          })
//          .then(response => response.json())
//          .then(data => {
//          console.log('Success:', data);
//          })
//          .catch((error) => {
//          console.error('Error:', error);
//          });
 
//          console.log(response);
//  }
 
