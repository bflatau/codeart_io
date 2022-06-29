const localURL ='http://zerocool:8090/openai';
const proxyURL = 'https://aa76-2600-1700-dd90-4c80-8007-8600-2c76-c02.ngrok.io/openai';
const serverURL = 'http://solaire:8090/openai';
const wireguardURL = 'http://10.0.0.11:8090/openai';


let typingEnabled = true;


function handleKeyPress(event) {
    if (event.key == 'Enter') {
        // event.preventDefault();
        console.log('enter pressed');
        const submittedText = document.getElementById("input-field").value;  
        pollOpenAi(submittedText, 'embedding');
        document.getElementById("input-field").value = '';
        document.getElementById('input-field').readOnly = true;
        document.getElementById('helper-text-container').style.display = 'none'     
        document.getElementById('input-field').style.display = 'none'    
        // document.getElementById('animation').style.display = 'block'     
        document.getElementById("waiting-text").innerText = 'PLEASE WAIT...';
        // return false;

    }

    setTimeout(() => {
        document.getElementById("input-field").value = '';
      }, "30000")

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




////WEBSOCKET STUFF///
var socket = io();

socket.on('enable keyboard', function(msg) {
    document.getElementById('input-field').style.display = 'block'  
    document.getElementById("waiting-text").innerText = '';
    document.getElementById('helper-text-container').style.display = 'block'    
    // document.getElementById('animation').style.display = 'none' 
    document.getElementById('input-field').readOnly = false;
    document.getElementById('input-field').focus();
  });