import React, { Component } from "react";
import './style.css';
import InputBoardButton from '../InputBoardButton';


const gameBoardSymbolsTop = [1, 2, 3, 4, 5 , 6 , 7 , 8, 9 , 10];

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
                  
                    <div className='symbol-layout-container'>
                        <div className='symbol-container'>
                            {   
                                gameBoardSymbolsTop.map((symbol, id)=>{
                                    return( <div className='symbol' key={id}> {symbol} </div>)
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


