const express = require('express');
const rpio = require('rpio');
const cors = require('cors');

rpio.open(16, rpio.OUTPUT, rpio.LOW);
const app = express();


app.use(cors({
    origin: '*'
}));




app.post('/on', (req, res) => {
    rpio.write(16, rpio.LOW);
    res.send('power on');
});

app.post('/off', (req, res) => {
    rpio.write(16, rpio.HIGH);
    res.send('power off');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));