const express = require('express');
var rpio = require('rpio');

rpio.open(16, rpio.OUTPUT, rpio.LOW);



const app = express();

app.get('/on', (req, res) => {
    rpio.write(16, rpio.LOW);
    res.send('power on');
});

app.get('/off', (req, res) => {
    rpio.write(16, rpio.HIGH);
    res.send('power off');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));