import React, { Component } from "react";
import './style.css';

class InputBoardButton extends Component {
    constructor() {
        super();
        this.state = {
            buttonOn: false
        };
    }

    render() {

        return (
            <div 
                className={`input-board-button-${this.props.color}`}
                // onClick={()=>{
                //     this.props.socket.emit('button pressed', this.props.buttonID)                    
                // }}
                
            >

                {this.props.buttonValue}

            </div> 
        )
    }
}
export default InputBoardButton;


