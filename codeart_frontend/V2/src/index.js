import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SocketTest from './components/SocketTest/SocketTest';
import Header from './components/Header/Header';

import 'typeface-libre-barcode-128-text';

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:8090");

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <div id='app-content'>
      <Header />
      <SocketTest socket={socket}/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
