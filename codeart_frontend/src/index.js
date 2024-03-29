import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import SocketTest from './components/SocketTest/SocketTest';
import Main from './components/Main/';
import 'typeface-libre-barcode-128-text';
import socketIOClient from "socket.io-client";
import { apiURL, plugURL } from './constants';
//const backendHost = "http://raspberrypi:8090"
const backendHost = apiURL;


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

const resetModule = async (x, y) => {
  try {
    const result = await fetch(new URL('/splitflap/reset_module', backendHost), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({x, y})
    })
    console.log(`Reset module result: ${await result.text()}`)
  } catch (err) {
    alert(err)
  }
}

const startAnimation = async (animation) => {
  try {
    const result = await fetch(new URL('/splitflap/start_animation', backendHost), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({animation})
    })
    console.log(`Start animation result: ${await result.text()}`)
  } catch (err) {
    alert(err)
  }
}

const stopAnimation = async () => {
  try {
    const result = await fetch(new URL('/splitflap/stop_animation', backendHost), {
      method: 'POST',
    })
    console.log(`Stop animation result: ${await result.text()}`)
  } catch (err) {
    alert(err)
  }
}

const turnPlugOn= () => {
  console.log('turning on')
  fetch(`${plugURL}/on`,{method: 'POST'}).then(response =>{
}).catch(err =>{alert(err)}) 
  
}

const turnPlugOff= () => {
  fetch(`${plugURL}/off`,{method: 'POST'}).then(response =>{
}).catch(err =>{alert(err)}) 
  
}





ReactDOM.render(
  <React.StrictMode>
    <div id='app-content'>
      <Main socket={socket} splitflapHardReset={splitflapHardReset} resetModule={resetModule} startAnimation={startAnimation} stopAnimation={stopAnimation} turnPlugOn={turnPlugOn} turnPlugOff={turnPlugOff} />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
