// const inputField = document.getElementById('input-field');

function handleKeyPress(event) {
    if (event.key == 'Enter') {
        // event.preventDefault();
        console.log('enter pressed')
        // document.getElementById("input-field").blur();
        document.getElementById("input-field").value = '';
        // return false;
    }
}
