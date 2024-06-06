

//NOTES:
// 1 = yellow
// 2 = green
// 3 = white
// 4 = pink
// 5 = orange

const flapChars = /^[a-z@#\$%&\*!?]$/i;

const generateFlapsGrid = () => {
    const flapsContainer = document.getElementById('flaps');

    for (let i = 0; i < 108; i++) {
        const flapInput = document.createElement('input');
        flapInput.maxLength = 1;
        flapInput.type = 'text';
        flapInput.dataset.flapId = i;
        flapsContainer.appendChild(flapInput);
        flapInput.onkeydown = event => {
            clearGenerated();
            if (event.key === ' ') { //SPACEBAR
                // console.log("key down:", event.key)
                event.preventDefault();
                event.currentTarget.nextSibling.focus();
            }else if(event.key === 'ArrowRight'){
                event.preventDefault();
                event.currentTarget.nextSibling.focus();
            }else if(event.key === 'ArrowLeft'){
                event.preventDefault();
                event.currentTarget.previousSibling.focus();
            }else if(event.key === 'Backspace'){
                event.currentTarget.value = ''
                event.currentTarget.previousSibling.focus();
            }else if (event.key === 'ArrowUp'){
                event.preventDefault();
                const upflapId = event.currentTarget.dataset.flapId;
                const upFlap = document.querySelector(`[data-flap-id="${parseInt(upflapId) - 18}"]`);
                upFlap.focus()
            }else if (event.key === 'ArrowDown'){
                event.preventDefault();
                const downflapId = event.currentTarget.dataset.flapId;
                const downFlap = document.querySelector(`[data-flap-id="${parseInt(downflapId) + 18}"]`);
                downFlap.focus()
            }else if(flapChars.test(event.key)){ //check if valid character
                // console.log('isvalidkey?',flapChars.test(event.key), event.key)
                event.currentTarget.value = event.key
                event.preventDefault()
                event.currentTarget.nextSibling.focus()
            }else{
                event.preventDefault() //don't allow characters to be input
            }

            //HANDLE COLORED FLAPS
            if(event.key === '1' || event.currentTarget.innerHTML === '1'){ //YELLOW FLAP
                event.currentTarget.style.color = '#FFFF66'
                event.currentTarget.style.backgroundColor = '#FFFF66'
                event.currentTarget.value = '1'
                event.currentTarget.nextSibling.focus();
            }else if(event.key === '2'){ //GREEN FLAP
                event.currentTarget.style.color = '#66FF66'
                event.currentTarget.style.backgroundColor = '#66FF66'
                event.currentTarget.value = '2'
                event.currentTarget.nextSibling.focus();
            }else if(event.key === '3'){ //WHITE FLAP
                event.currentTarget.style.color = 'white'
                event.currentTarget.style.backgroundColor = 'white'
                event.currentTarget.value = '3'
                event.currentTarget.nextSibling.focus();
            }else if(event.key === '4'){ //MAGENTA FLAP
                event.currentTarget.style.color = '#FF00CC'
                event.currentTarget.style.backgroundColor = '#FF00CC'
                event.currentTarget.value = '4'
                event.currentTarget.nextSibling.focus();
            }else if(event.key === '5'){ //ORANGE FLAP
                event.currentTarget.style.color = '#FF9933'
                event.currentTarget.style.backgroundColor = '#FF9933'
                event.currentTarget.value = '5'
                event.currentTarget.nextSibling.focus();
            }else if(event.key !== 'ArrowLeft' && event.key !== ' ' && event.key !== 'ArrowRight' && event.key !== 'ArrowUp' && event.key !== 'ArrowDown') { //BENDO: CHECK THIS
                event.currentTarget.style.color = 'white'
                event.currentTarget.style.backgroundColor = 'black'
            }

            //ON ENTER (SUBMIT DATA)
            if(event.key === 'Enter'){
                generateData() //send data to board
                const flapsContainer = document.getElementById('flaps');

                [...flapsContainer.children].forEach(child => {
                    child.value = '';
                    child.style.color = 'white';
                    child.style.backgroundColor = 'black'
                });
                startUpFocus();
            }

        }
    }
}

const generateData = () => {
    const allData = {};
    const flapsContainer = document.getElementById('flaps');
    const flapInputs = flapsContainer.children;
    const flapData = [];
    let flapString;

    for (let i = 0; i < flapInputs.length; i++) {
        const val = flapInputs[i].value?.trim();

        if (flapInputs[i].value){

            switch (flapInputs[i].value) {
                case '1':
                    flapString += 'y'
                    break;
                case '2':
                    flapString += 'g'
                    break;
                case '3':
                    flapString += 'w'
                    break;
                case '4':
                    flapString += 'p'
                    break;
                case '5':
                    flapString += 'o'
                    break;
               
                default:
                    flapString += flapInputs[i].value.toUpperCase();
              }    
        }
        else{
            flapString += "\xa0"
        }
        
        flapData.push(val.length && val || null);
        
    }


    allData.text = flapString.slice(9);

    const data = JSON.stringify(allData);

    

    // CALL API

    const localURL ='http://192.168.1.124:8090/splitflap/set_flap_text';

  
    
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
    })
    .catch((error) => {
    console.error('Error:', error);
    });

    // SHOW API TEXT IN BROWSER
    document.getElementById('generated-data').innerHTML = data;
}

const clearGenerated = () => {
    document.getElementById('generated-data').innerHTML = '';
}

const startUpFocus = () => {
    const firstFlap = document.querySelector('[data-flap-id="0"]');
    firstFlap.focus()
}

window.addEventListener('DOMContentLoaded', (event) => {
    // generateBtnsGrid();
    generateFlapsGrid();
    startUpFocus();
});
