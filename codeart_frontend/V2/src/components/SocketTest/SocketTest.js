import React, { Component } from "react";
// import socketIOClient from "socket.io-client";
import './style.css';

class SocketTest extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://0.0.0.0:8090",
      color: 'white',
    };
  }

  componentDidMount() {
    // on initial mount, set all websocket stuff //
    this.props.socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })
  }

  // sending sockets
  send = () => {
    // const socket = socketIOClient(this.state.endpoint);
    this.props.socket.emit('change color', this.state.color) // change 'red' to this.state.color
  }
  
  // adding the function
  setColor = (color) => {
    this.setState({color})
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send() }>Change Color</button>
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
      </div>
    )
  }
}
export default SocketTest;