import React, { Component } from "react";
import './style.css';
import InputBoardButton from '../InputBoardButton';
// import { TiTimesOutline, TiTimes, TiStarOutline, TiStar,  TiMediaStopOutline, TiMediaStop, TiMediaRecord, TiMediaRecordOutline } from "react-icons/ti";

const boxLayouts = [
    {position: 0, symbol: '$', color: 'green'},
    {position: 0, symbol: '&', color: 'red'},

    {position: 1, symbol: '$', color: 'green'},
    {position: 1, symbol: '&', color: 'red'},
    {position: 2, symbol: '$', color: 'green'},
    {position: 2, symbol: '&', color: 'red'},
    {position: 3, symbol: '$', color: 'green'},
    {position: 3, symbol: '&', color: 'red'},
    {position: 4, symbol: '$', color: 'green'},
    {position: 4, symbol: '&', color: 'red'},
    {position: 5, symbol: '$', color: 'green'},
    {position: 6, symbol: '&', color: 'red'},
    {position: 6, symbol: '$', color: 'green'},
    {position: 7, symbol: '&', color: 'red'},
    {position: 7, symbol: '$', color: 'green'},
    {position: 8, symbol: '&', color: 'red'},
    {position: 8, symbol: '$', color: 'green'},
    {position: 9, symbol: '&', color: 'red'},
    {position: 9, symbol: '$', color: 'green'},
    {position: 10, symbol: '&', color: 'red'},
    {position: 10, symbol: '$', color: 'green'},
    {position: 12, symbol: '&', color: 'red'},
    {position: 12, symbol: '$', color: 'green'},
    {position: 13, symbol: '$', color: 'green'},
    {position: 13, symbol: '&', color: 'red'},
    {position: 14, symbol: '$', color: 'green'},
    {position: 14, symbol: '&', color: 'red'},
    {position: 15, symbol: '$', color: 'green'},
    {position: 15, symbol: '&', color: 'red'},
    {position: 16, symbol: '$', color: 'green'},
    {position: 16, symbol: '&', color: 'red'},
    {position: 17, symbol: '$', color: 'green'},
    {position: 17, symbol: '&', color: 'red'},
    {position: 18, symbol: '$', color: 'green'},
    {position: 18, symbol: '&', color: 'red'},
    {position: 19, symbol: '$', color: 'green'},
    {position: 19, symbol: '&', color: 'red'},
    {position: 20, symbol: '$', color: 'green'},
    {position: 20, symbol: '&', color: 'red'},
    {position: 21, symbol: '$', color: 'green'},
    {position: 21, symbol: '&', color: 'red'},
    {position: 22, symbol: '$', color: 'green'},
    {position: 22, symbol: '&', color: 'red'},
    {position: 23, symbol: '$', color: 'green'},
    {position: 23, symbol: '&', color: 'red'},
    {position: 24, symbol: '$', color: 'green'},
    {position: 24, symbol: '$', color: 'green'}, 
]
 


class InputBoard extends Component {
    constructor() {
        super();
        this.state = {
            numberOfUsers: 0,
            boardLayout: Array(24).fill('X'),
        };
    }

    componentDidMount() {
        this.props.socket.on('connected users', (data) => {
            this.setState({ numberOfUsers: data.numberOfUsers })
        })

        this.props.socket.on('button down', (data) => {
            console.log(`pin ${data} down`)
            this.updateBoardLayout(data);
        })

        this.props.socket.on('button up', (data) => {
            console.log(`pin ${data} up`)
            this.updateBoardLayout(data);
        })
    }


    updateBoardLayout = i => { // i = pin number
        this.setState(state => {
        //const value has to be the same as state value setState (key:value)
          const boardLayout = state.boardLayout.map((item, j) => {

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
          return {
            boardLayout,
          };
        });
      };

    createInputGrid = () => {
        let table = [];

        for (let i = 0; i < this.state.boardLayout.length; i++) {
            table.push(
                <InputBoardButton
                    key={i}
                    buttonID={i}
                    buttonValue={this.state.boardLayout[i]}
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


