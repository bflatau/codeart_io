import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import SocketTest from './components/SocketTest/SocketTest';
import Main from './components/Main/';

import 'typeface-libre-barcode-128-text';

import socketIOClient from "socket.io-client";

//const backendHost = "http://raspberrypi:8090"
const backendHost = "http://localhost:8090"


const socket = socketIOClient(backendHost);

// import * as serviceWorker from './serviceWorker';

const splitflapHardReset = async () => {
  try {
    const result = await fetch(new URL('/splitflap/hard_reset', backendHost), {
      method: 'POST',
    })
    alert(await result.text())
  } catch (err) {
    alert(err)
  }
}


ReactDOM.render(
  <React.StrictMode>
    <div id='app-content'>
      <Main socket={socket} splitflapHardReset={splitflapHardReset} />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
