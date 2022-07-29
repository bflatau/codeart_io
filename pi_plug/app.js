const express = require('express');

const app = express();

app.get('/on', (req, res) => {
  res.send('power on');
});

app.get('/off', (req, res) => {
    res.send('power off');
  });

app.listen(3000, () => console.log('Example app is listening on port 3000.'));