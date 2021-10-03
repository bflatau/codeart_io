import React, { Component } from "react";
import './style.css';
import OutputBoardFlap from '../OutputBoardFlap';

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
    {symbol: '?', color: 'white'},
    {symbol: 'S', color: 'black'},
    {symbol: '#', color: 'pink'},
    {symbol: 'U', color: 'orange'},
    {symbol: 'X', color: 'black'},
]


class OutputBoard extends Component {
    constructor() {
        super();
        this.state = {
            boardOutputs: Array(108).fill(0),
        };
    }


    componentDidMount() {

        this.props.socket.on('button down', (data) => {
            console.log('socket data', data)
            this.updateOutputBoardLayout(data.flaps);
        })

        this.props.socket.on('button up', (data) => {
            this.updateOutputBoardLayout(data.flaps);
        })
    }


    updateOutputBoardLayout = arr => { // i = array
        this.setState({boardOutputs: arr})
      };


   
    createOutputGrid = () => {
        let table = [];

        for (let i = 0; i < this.state.boardOutputs.length; i++) {
            table.push(
                <OutputBoardFlap
                    key={i}
                    flapID={i}
                    flapValue={flapLayouts[this.state.boardOutputs[i]].symbol}
                    color={flapLayouts[this.state.boardOutputs[i]].color}
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


