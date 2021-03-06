const wireguardURL = 'http://10.0.0.11:8090/openai';
const CHMURL = 'http://10.42.0.1:8090/openai'; //SHOULD THIS GO TO zerocool if/when the server restarts and gets a new IP??

const urlParams = new URLSearchParams(window.location.search);
const wireguardQueryParam = urlParams.get('wireguard');
const fetchUrl = wireguardQueryParam ? wireguardURL : CHMURL;

let typingEnabled = true;

let resetTimeout = undefined;
function handleKeyPress(event) {

    const flapChars = /[^a-z @ # \$ % & \* ! ?]/gmi;

    if (event.key == 'Enter') {
        // event.preventDefault();
        console.log('enter pressed');
        const submittedText = document.getElementById("input-field").value;  
        if (submittedText.length === 0) {
            return;
        }
        pollOpenAi(submittedText, 'embedding');
        document.getElementById("input-field").value = '';
        setKeyboard(false)
        // return false;

    } else if(flapChars.test(event.key)){
        event.preventDefault();
        document.getElementById('warning-text').style.display = 'block' 
    }

    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
        document.getElementById("input-field").value = '';
      }, "30000")




}


function pollOpenAi(inputText, aiEngine){

    const data = JSON.stringify({text: inputText.toUpperCase(), ai: aiEngine});

    fetch(fetchUrl, {
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

function setKeyboard(enabled) {
    if (enabled) {
        document.getElementById('input-field').style.display = 'block'  
        document.getElementById("waiting-text").innerText = '';
        document.getElementById('helper-text-container').style.display = 'block'    
        document.getElementById('input-field').readOnly = false;
        document.getElementById('input-field').focus();
    } else {
        document.getElementById('input-field').readOnly = true;
        document.getElementById('helper-text-container').style.display = 'none'     
        document.getElementById('input-field').style.display = 'none'    
        document.getElementById("waiting-text").innerText = 'PLEASE WAIT...';
        document.getElementById('warning-text').style.display = 'none' 

    }
}


////WEBSOCKET STUFF///
var socket = io();

socket.on('keyboard', function(msg) {
    setKeyboard(msg.enable)
});