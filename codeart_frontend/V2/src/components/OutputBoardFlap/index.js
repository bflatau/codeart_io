import React, { Component } from "react";
import './style.css';

class OutputBoardFlap extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         buttonOn: false
    //     };
    // }

    render() {

        return (
            <div className={`split-flap-button-${this.props.color}`}>
                {this.props.flapValue}
            </div> 
        )
    }
}
export default OutputBoardFlap;