// const boxLayouts = [

//     [
//         {position: 0, symbol: '$', color: 'yellow'},
//         {position: 0, symbol: '*', color: 'pink'}
//     ],
    
//     [
//         {position: 1, symbol: '%', color: 'yellow'},
//         {position: 1, symbol: '!', color: 'orange'},
//     ],

//     [
//         {position: 2, symbol: '@', color: 'pink'},
//         {position: 2, symbol: '&', color: 'green'},
//     ],
   
//     [
//         {position: 3, symbol: '#', color: 'pink'},
//         {position: 3, symbol: '?', color: 'yellow'},
//     ],
    
//     [
//         {position: 4, symbol: '$', color: 'orange'},
//         {position: 4, symbol: '*', color: 'pink'},
//     ],

//     [
//         {position: 5, symbol: '%', color: 'orange'},
//         {position: 5, symbol: '!', color: 'orange'},
//     ],

//     [
//         {position: 6, symbol: '@', color: 'green'},
//         {position: 6, symbol: '&', color: 'green'},
//     ],
    
//     [
//         {position: 7, symbol: '#', color: 'green'},
//         {position: 7, symbol: '?', color: 'yellow'},
//     ],

//     [
//         {position: 8, symbol: '#', color: 'yellow'},
//         {position: 8, symbol: '?', color: 'yellow'},
//     ],

//     [
//         {position: 9, symbol: '$', color: 'yellow'},
//         {position: 9, symbol: '*', color: 'green'},
//     ],

//     [
//         {position: 10, symbol: '%', color: 'pink'},
//         {position: 10, symbol: '!', color: 'orange'},
//     ],

//     [
//         {position: 11, symbol: '@', color: 'pink'},
//         {position: 11, symbol: '&', color: 'pink'},
//     ],

//     [
//         {position: 12, symbol: '#', color: 'orange'},
//         {position: 12, symbol: '?', color: 'yellow'},
//     ],
    
//     [
//         {position: 13, symbol: '$', color: 'orange'},
//         {position: 13, symbol: '*', color: 'green'},
//     ],

//     [
//         {position: 14, symbol: '%', color: 'green'},
//         {position: 14, symbol: '!', color: 'orange'},
//     ],
    
//     [
//         {position: 15, symbol: '@', color: 'green'},
//         {position: 15, symbol: '&', color: 'pink'},
//     ],

//     [
//         {position: 16, symbol: '@', color: 'yellow'},
//         {position: 16, symbol: '&', color: 'pink'},
//     ],

//     [
//         {position: 17, symbol: '#', color: 'yellow'},
//         {position: 17, symbol: '?', color: 'orange'},
//     ],

//     [
//         {position: 18, symbol: '*', color: 'green'},
//         {position: 18, symbol: '$', color: 'pink'},
//     ],

//     [
//         {position: 19, symbol: '!', color: 'yellow'},
//         {position: 19, symbol: '%', color: 'pink'},
        
//     ],

//     [
//         {position: 20, symbol: '@', color: 'orange'},
//         {position: 20, symbol: '&', color: 'pink'},
//     ],

//     [
//         {position: 21, symbol: '?', color: 'orange'},   
//         {position: 21, symbol: '#', color: 'orange'},
//     ],

//     [
//         {position: 22, symbol: '$', color: 'green'},
//         {position: 22, symbol: '*', color: 'green'},
//     ],

//     [
//         {position: 23, symbol: '!', color: 'yellow'},
//         {position: 23, symbol: '%', color: 'green'},
//     ],
// ]


// const btnStates = ['off', 'a', 'b'];

// const generateBtnsGrid = btnStates => {
//     const btnsContainer = document.getElementById('btns');

//     for (let i = 0; i < 24; i++) {
//         const btnDiv = document.createElement('div');

//         btnDiv.dataset.btnId = i;
//         btnDiv.className = 'btn btn-pressed-off'
//         btnDiv.innerHTML = 'X';
//         btnDiv.dataset.btnState = 'off';
//         btnDiv.onclick = e => {
//             clearGenerated();
//             const btn = e.currentTarget;
//             if (btn.className === 'btn btn-pressed-off') {
//                 btn.className = `btn btn-pressed-a-${i}`;
//                 btn.dataset.btnState = 'a';
//                 btn.innerHTML = boxLayouts[i][0].symbol;
//             } else if (btn.className === `btn btn-pressed-a-${i}`) {
//                 btn.className = `btn btn-pressed-b-${i}`;
//                 btn.dataset.btnState = 'b';
//                 btn.innerHTML = boxLayouts[i][1].symbol;
//             } else {
//                 btn.className = 'btn btn-pressed-off';
//                 btn.dataset.btnState = 'off';
//                 btn.innerHTML = 'X'
//             }
//         }
//         btnsContainer.appendChild(btnDiv);
//     }
// }

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
            if (event.key === ' ') {
                event.preventDefault();
                event.currentTarget.nextSibling.focus();
            }
        }
        flapInput.onkeyup = event => {
            clearGenerated();
            if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
                event.currentTarget.previousSibling.focus();   
            } else if (event.key === ' ') {
                event.preventDefault();
                event.currentTarget.value = '';
            } else if (event.key === 'Shift') {
                event.preventDefault();
            } else if (event.key !== 'Tab') {
                event.currentTarget.nextSibling.focus();
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
    // const btnData = [];
    // const invalid = [];
    let flapString;
    for (let i = 0; i < flapInputs.length; i++) {
        const val = flapInputs[i].value?.trim();

        if (flapInputs[i].value){
            flapString += flapInputs[i].value.toUpperCase();
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

    if(buttonData){
        console.log(buttonData)
    }

    else{

        fetch('http://0.0.0.0:8090/splitflap/set_flaps', {
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
