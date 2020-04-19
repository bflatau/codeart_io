import React, { Component } from "react";
import './style.css';
import InputBoardButton from '../InputBoardButton';
import { TiPlus } from "react-icons/ti";


const gameBoardSymbolsColumns = [
    1, 2, 3, 4, 5 , 6 , <TiPlus className = 'orange' /> , 8, 9 , 10,
    11, 12, 13, 15, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60
];

const gameBoardSymbolsRows = [
    1, 2, 3, 4, 5 , 6 , 7 , 8, 9 , 10, 11, 
    12, 13, 15, 15, 16, 17, 18, 19, 20, 21, 22, 
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 
    34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 
    45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 
];

class InputBoard extends Component {
    constructor() {
        super();
        this.state = {
            numberOfUsers: 0,
            boardInputs: Array(50).fill('O'),
        };
    }

    componentDidMount() {
        this.props.socket.on('connected users', (data) => {
            this.setState({ numberOfUsers: data.numberOfUsers })
        })

        this.props.socket.on('button down', (data) => {
            this.updateBoardArray(data);
        })

        this.props.socket.on('button up', (data) => {
            this.updateBoardArray(data);
        })
    }


    updateBoardArray = i => {
        this.setState(state => {
        //const value has to be the same as state value setState (key:value)
          const boardInputs = state.boardInputs.map((item, j) => {
            if (j === i && item !== 'I') {
              return 'I';
            } 
            else if(j === i && item === 'I') {
              return 'O';
            } 
            else{
                return item;
            }
          });
          return {
            boardInputs,
          };
        });
      };

    createInputGrid = () => {
        let table = [];

        for (let i = 0; i < this.state.boardInputs.length; i++) {
            table.push(
                <InputBoardButton
                    key={i}
                    buttonID={i}
                    buttonValue={this.state.boardInputs[i]}
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
                  
                    <div className='column-symbol-layout-container'>
                        <div className='column-symbol-container'>
                            {   
                                gameBoardSymbolsColumns.map((symbol, id)=>{
                                    return( <div className='column-symbol' key={id}> {symbol} </div>)
                                }) 
                            }
                        </div>
                    </div>

                    <div className='row-symbol-layout-container'>
                        <div className='row-symbol-container'>
                            {   
                                gameBoardSymbolsRows.map((symbol, id)=>{
                                    return( <div className='row-symbol' key={id}> {symbol} </div>)
                                }) 
                            }
                        </div>
                    </div>

                    {this.createInputGrid()}

                </div>
            </div>
        )
    }
}
export default InputBoard;


