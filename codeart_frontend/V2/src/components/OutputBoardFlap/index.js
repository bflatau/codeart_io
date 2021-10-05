import React, { Component } from "react";
import './style.css';

const flapLayouts = [
    {symbol: '_', color: 'black-empty'},
    {symbol: 'J', color: 'black'},
    {symbol: 'B', color: 'black'},
    {symbol: 'M', color: 'black'},
    {symbol: 'R', color: 'black'},
    {symbol: '$', color: 'black'},
    {symbol: 'V', color: 'black'},
    {symbol: 'K', color: 'black'},
    {symbol: 'A', color: 'black'},
    {symbol: 'E', color: 'black'},
    {symbol: 'N', color: 'black'},
    {symbol: 'O', color: 'black'},
    {symbol: '_', color: 'yellow'},
    {symbol: '*', color: 'black'},
    {symbol: '_', color: 'green'},
    {symbol: 'G', color: 'black'},
    {symbol: 'I', color: 'black'},
    {symbol: '%', color: 'black'},
    {symbol: 'D', color: 'black'},
    {symbol: 'L', color: 'black'},
    {symbol: '&', color: 'black'},
    {symbol: '@', color: 'black'},
    {symbol: 'C', color: 'black'},
    {symbol: 'W', color: 'black'},
    {symbol: 'H', color: 'black'},
    {symbol: 'Y', color: 'black'},
    {symbol: '_', color: 'white'},
    {symbol: 'Q', color: 'black'},
    {symbol: '_', color: 'pink'},
    {symbol: '_', color: 'orange'},
    {symbol: '!', color: 'black'},
    {symbol: 'T', color: 'black'},
    {symbol: 'Z', color: 'black'},
    {symbol: 'P', color: 'black'},
    {symbol: 'F', color: 'black'},
    {symbol: '?', color: 'black'},
    {symbol: 'S', color: 'black'},
    {symbol: '#', color: 'black'},
    {symbol: 'U', color: 'black'},
    {symbol: 'X', color: 'black'},
]


class OutputBoardFlap extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         buttonOn: false
    //     };
    // }

    render() {

        return this.props.data !== undefined ? (
            <td className={`split-flap-button-${flapLayouts[this.props.data.flapIndex].color}`} style={{border: this.props.data.countUnexpectedHome + this.props.data.countMissedHome > 0 ? '4px solid red' : '4px solid white'}}>
                {flapLayouts[this.props.data.flapIndex].symbol}
            </td> 
        ) : (
            <td className={`split-flap-button-black-empty`}>
            </td> 
        )
    }
}
export default OutputBoardFlap;