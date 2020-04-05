import React, { Component } from "react";
import './style.css';
import InputBoardButton from '../InputBoardButton';

class InputBoard extends Component {
    constructor() {
        super();
        this.state = {
            numberOfUsers: 0,
            numberOfInputs: 10
        };
    }

    componentDidMount() {
        this.props.socket.on('connected users', (data) => {
            this.setState({ numberOfUsers: data.numberOfUsers, numberOfInputs: data.numberOfInputs })
        })
    }

    createInputGrid = () => {
        let table = [];

        for (let i = 0; i < this.state.numberOfInputs; i++) {
            table.push(
                <InputBoardButton
                    key={i}
                    buttonValue={i}
                    socket={this.props.socket}
                />
            )
        }
        return table
    }

    render() {

        return (
            <div className="input-board-container">
                <div className="input-board-users">
                  People Playing: {this.state.numberOfUsers}
                </div>
                <div className="input-board">
                    {this.createInputGrid()}
                </div>
            </div>
        )
    }
}
export default InputBoard;


