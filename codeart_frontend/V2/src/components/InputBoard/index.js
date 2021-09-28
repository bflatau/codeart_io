import React, { Component } from "react";
import './style.css';
import InputBoardButton from '../InputBoardButton';
// import { TiTimesOutline, TiTimes, TiStarOutline, TiStar,  TiMediaStopOutline, TiMediaStop, TiMediaRecord, TiMediaRecordOutline } from "react-icons/ti";

const boxLayouts = [
    {position: 0, symbol: '$', color: 'yellow'},
    {position: 0, symbol: '*', color: 'pink'},

    {position: 1, symbol: '%', color: 'yellow'},
    {position: 1, symbol: '!', color: 'orange'},

    {position: 2, symbol: '@', color: 'pink'},
    {position: 2, symbol: '&', color: 'green'},

    {position: 3, symbol: '#', color: 'pink'},
    {position: 3, symbol: '?', color: 'yellow'},

    {position: 4, symbol: '$', color: 'orange'},
    {position: 4, symbol: '*', color: 'pink'},

    {position: 5, symbol: '%', color: 'orange'},
    {position: 5, symbol: '!', color: 'orange'},

    {position: 6, symbol: '@', color: 'green'},
    {position: 6, symbol: '&', color: 'green'},

    {position: 7, symbol: '#', color: 'green'},
    {position: 7, symbol: '?', color: 'yellow'},

    {position: 8, symbol: '#', color: 'yellow'},
    {position: 8, symbol: '?', color: 'yellow'},

    {position: 9, symbol: '$', color: 'yellow'},
    {position: 9, symbol: '*', color: 'green'},

    {position: 10, symbol: '%', color: 'pink'},
    {position: 10, symbol: '!', color: 'orange'},

    {position: 11, symbol: '@', color: 'pink'},
    {position: 11, symbol: '&', color: 'pink'},

    {position: 12, symbol: '#', color: 'orange'},
    {position: 12, symbol: '?', color: 'yellow'},

    {position: 13, symbol: '$', color: 'orange'},
    {position: 13, symbol: '*', color: 'green'},

    {position: 14, symbol: '%', color: 'green'},
    {position: 14, symbol: '!', color: 'orange'},

    {position: 15, symbol: '@', color: 'green'},
    {position: 15, symbol: '&', color: 'pink'},

    {position: 16, symbol: '@', color: 'yellow'},
    {position: 16, symbol: '&', color: 'pink'},

    {position: 17, symbol: '#', color: 'yellow'},
    {position: 17, symbol: '?', color: 'orange'},

    {position: 18, symbol: '$', color: 'pink'},
    {position: 18, symbol: '*', color: 'green'},

    {position: 19, symbol: '%', color: 'pink'},
    {position: 19, symbol: '!', color: 'yellow'},

    {position: 20, symbol: '@', color: 'orange'},
    {position: 20, symbol: '&', color: 'pink'},

    {position: 21, symbol: '#', color: 'orange'},
    {position: 21, symbol: '?', color: 'orange'},

    {position: 22, symbol: '$', color: 'green'},
    {position: 22, symbol: '*', color: 'green'},

    {position: 23, symbol: '$', color: 'green'},
    {position: 23, symbol: '&', color: 'pink'},

    {position: 24, symbol: '%', color: 'green'},
    {position: 24, symbol: '!', color: 'yellow'}, 
]
 


class InputBoard extends Component {
    constructor() {
        super();
        this.state = {
            numberOfUsers: 0,
            boardSymbols: Array(24).fill('X'),
            boardColors: Array(24).fill('black')
        };
    }

    componentDidMount() {
        this.props.socket.on('connected users', (data) => {
            this.setState({ numberOfUsers: data.numberOfUsers })
        })

        this.props.socket.on('button down', (data) => {
            this.updateBoardLayout(data);
        })

        this.props.socket.on('button up', (data) => {
            this.updateBoardLayout(data);
        })
    }


    updateBoardLayout = i => { // i = pin number
        this.setState(state => {
        //const value has to be the same as state value setState (key:value)
          const boardSymbols= state.boardSymbols.map((item, j) => {

            if (j === boxLayouts[i].position && item !== boxLayouts[i].symbol) {
              return boxLayouts[i].symbol;
            } 
            else if(j === boxLayouts[i].position  && item === boxLayouts[i].symbol) {
              return 'X';
            } 
            else{
                return item;
            }
          });

          const boardColors = state.boardColors.map((item, j) => {

            if (j === boxLayouts[i].position && item !== boxLayouts[i].color) {
              return boxLayouts[i].color;
            } 
            else if(j === boxLayouts[i].position  && item === boxLayouts[i].color) {
              return 'black';
            } 
            else{
                return item;
            }
          });

          return {
            boardSymbols,
            boardColors
          };
        });
      };

    createInputGrid = () => {
        let table = [];

        for (let i = 0; i < this.state.boardSymbols.length; i++) {
            table.push(
                <InputBoardButton
                    key={i}
                    buttonID={i}
                    buttonValue={this.state.boardSymbols[i]}
                    socket={this.props.socket}
                    color={this.state.boardColors[i]}
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


