import React, { Component } from "react";
import './style.css';
import OutputBoardFlap from '../OutputBoardFlap';


class OutputBoard extends Component {
    constructor() {
        super();
        this.state = {
            boardOutputs: Array(108).fill('X'),
        };
    }

   
    createOutputGrid = () => {
        let table = [];

        for (let i = 0; i < this.state.boardOutputs.length; i++) {
            table.push(
                <OutputBoardFlap
                    key={i}
                    flapID={i}
                    flapValue={this.state.boardOutputs[i]}
                    // socket={this.props.socket}
                />
            )
        }
        return table
    }
    
    render() {
        return (
            <div className="output-board-container">
                <div className="output-board">
                    {this.createOutputGrid()}
                </div>
            </div>
        )
    }
}
export default OutputBoard;


