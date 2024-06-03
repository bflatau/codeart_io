

//NOTES:
// 1 = yellow
// 2 = green
// 3 = white
// 4 = magenta
// 5 = orange

const generateFlapsGrid = flapStates => {
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
                console.log("key down:", event.key)
                event.preventDefault();
                event.currentTarget.nextSibling.focus();
            }else if(event.key !== 'ArrowLeft' && event.key !== 'Tab' && event.key !== 'ArrowRight' && event.key !== 'Backspace'){ //BENDO: find a better way to omit all the other keys!

                event.currentTarget.value = event.key
            }
        }
        flapInput.onkeyup = event => {
            clearGenerated();

            //CHECK KEYS PRESSED
            if (event.key === 'ArrowLeft') {
                event.currentTarget.previousSibling.focus();   
            }else if (event.key === 'Backspace'){
                event.currentTarget.value = '';
                event.currentTarget.previousSibling.focus();
            }else if (event.key === ' ') {
                event.preventDefault();
                event.currentTarget.value = '';
            } else if (event.key === 'Shift') {
                event.preventDefault();
            } else if (event.key !== 'Tab') {
                console.log('this key entered', event.key)
                event.currentTarget.nextSibling.focus();
            }

            // SET CSS BASED ON KEY (FOR COLORED FLAPS)
            if(event.key === '1' || event.currentTarget.innerHTML === '1'){ //YELLOW FLAP
                event.currentTarget.style.color = '#FFFF66'
                event.currentTarget.style.backgroundColor = '#FFFF66'
            }else if(event.key === '2'){ //GREEN FLAP
                event.currentTarget.style.color = '#66FF66'
                event.currentTarget.style.backgroundColor = '#66FF66'
            }else if(event.key === '3'){ //WHITE FLAP
                event.currentTarget.style.color = 'white'
                event.currentTarget.style.backgroundColor = 'white'
            }else if(event.key === '4'){ //MAGENTA FLAP
                event.currentTarget.style.color = '#FF00CC'
                event.currentTarget.style.backgroundColor = '#FF00CC'
            }else if(event.key === '5'){ //ORANGE FLAP
                event.currentTarget.style.color = '#FF9933'
                event.currentTarget.style.backgroundColor = '#FF9933'
            }else if(event.key !== 'ArrowLeft' && event.key !== 'Tab' && event.key !== 'ArrowRight') {
                    event.currentTarget.style.color = 'white'
                event.currentTarget.style.backgroundColor = 'black'
            }
        }
    }
}

const generateData = (buttonData) => {
    const allData = {};
    const flapsContainer = document.getElementById('flaps');
    const flapInputs = flapsContainer.children;
    const flapData = [];
    const newFlapData = [];
    const colorCodes = ['y', 'g', 'w', 'p', 'o']
    // const btnData = [];
    // const invalid = [];
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

        
        // If uppercase and lowercase are equal, it's not a letter
        // if (val && val.toUpperCase() === val.toLowerCase()) {
        //     invalid.push({[i]: val});
        // }
        
        flapData.push(val.length && val || null);
        
        newFlapData.push({
            id: i,
            value: val.length && val || null,
            isRevealed: false
        });
    }

    // if (invalid.length > 0) {
    //     document.getElementById('generated-data').innerHTML = JSON.stringify({ ERROR_INVALID_BOXES: invalid});
    //     return;        
    // }


    allData.text = flapString.slice(9);

    const data = JSON.stringify(allData);

    

    // CALL API

    const localURL ='http://192.168.1.124:8090/splitflap/set_flaps';
    const proxyURL = 'https://aa76-2600-1700-dd90-4c80-8007-8600-2c76-c02.ngrok.io/splitflap/set_flaps';

    if(buttonData){
        console.log(buttonData)
    }

    else{
    
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
    }


    // SHOW API TEXT IN BROWSER
    document.getElementById('generated-data').innerHTML = data;
}

const clearGenerated = () => {
    document.getElementById('generated-data').innerHTML = '';
}

window.addEventListener('DOMContentLoaded', (event) => {
    // generateBtnsGrid();
    generateFlapsGrid();
});
