import React, { Component } from "react";
import './style.css';

class InputBoard extends Component {
    constructor() {
        super();
        this.state = {
            numberOfUsers: 0
        };
    }

    componentDidMount() {
        this.props.socket.on('connected users', (data) => {
            console.log(data)
            this.setState({ numberOfUsers: data })
        })
    }

    render() {

        return (
            <div className="input-board-container">
                <div className="input-board-users">
                  People Playing: {this.state.numberOfUsers}
                </div>
                <div className="input-board"></div>
            </div>
        )
    }
}
export default InputBoard;


