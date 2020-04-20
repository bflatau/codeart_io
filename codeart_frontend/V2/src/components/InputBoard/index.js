import React, { Component } from "react";
import './style.css';
import InputBoardButton from '../InputBoardButton';
import { TiTimesOutline, TiTimes, TiStarOutline, TiStar,  TiMediaStopOutline, TiMediaStop, TiMediaRecord, TiMediaRecordOutline } from "react-icons/ti";


const gameBoardSymbolsColumns = [
    <TiStarOutline className='black'/>, <TiTimesOutline className = 'red' /> , <TiMediaStopOutline className='black' />, <TiMediaRecord className='blue' />, <TiStarOutline className='black'/> , <TiTimes className='black' /> , <TiMediaStop className = 'purple' /> , <TiMediaStopOutline className='orange' />, <TiTimesOutline className='cyan'/> , <TiMediaStopOutline className="black"/>,
   
    <TiTimesOutline className='black'/>, <TiTimesOutline className='red'/>, <TiMediaStop className='black'/>, <TiMediaRecord className='black'/>, <TiStar className='blue'/>, <TiMediaStopOutline className='black'/>, <TiTimes className='purple'/>, <TiMediaStopOutline className='orange'/>, <TiTimesOutline className='cyan'/>, <TiMediaRecordOutline className='black'/> ,
    
    <TiTimesOutline className='black'/>, <TiMediaStopOutline className='red'/>, <TiMediaRecord className='green'/>, <TiTimes className='black'/>, <TiMediaRecord className='blue'/>, <TiMediaStopOutline className='purple'/>, <TiStar className='black'/>, <TiTimes className='black'/>, <TiMediaStopOutline className='cyan'/>, <TiStarOutline className='black'/>,
    
    <TiTimes className='red'/>, <TiMediaStopOutline className='black'/>, <TiMediaRecordOutline className='green'/>, <TiStar className='blue'/>, <TiMediaStopOutline className='black'/>, <TiTimes className='purple'/>, <TiStarOutline className='cyan'/>, <TiStarOutline className='black'/>, <TiMediaStop className='magenta'/>, <TiTimes className='black'/>,
    
    <TiStarOutline className='red'/>, <TiMediaStop className='black'/>, <TiTimesOutline className='green'/>, <TiMediaRecordOutline className='yellow'/>, <TiMediaStopOutline className='blue'/>, <TiStar className='black'/>, <TiTimes className='purple'/>, <TiMediaRecordOutline className='cyan'/>, <TiStarOutline className='magenta'/>, <TiMediaStopOutline className='black'/>,
    
    <TiMediaRecordOutline className='red'/>, <TiMediaStop className='black'/>, <TiTimesOutline className='green'/>, <TiMediaRecordOutline className='yellow'/>, <TiMediaStopOutline className='black'/>, <TiStar className='black'/>, <TiTimesOutline className='purple'/>, <TiMediaRecord className='cyan'/>, <TiStarOutline className='black'/>, <TiMediaStopOutline className='black'/>
];

const gameBoardSymbolsRows = [
    <TiMediaStop className='black'/>, <TiMediaRecord className='black'/>,  <TiMediaRecord className='black'/>, <TiStarOutline className='black'/>, <TiTimesOutline className = 'blue' />, <TiMediaRecord className='black'/> , <TiMediaStopOutline className='black'/>  , <TiMediaRecordOutline className='black'/> , <TiStarOutline className='black'/> , <TiStarOutline className='black'/>, <TiTimesOutline className='black'/>, 
    
    <TiStarOutline className='green'/>, <TiTimesOutline className='green'/>, <TiMediaStopOutline className='green'/>, <TiMediaRecordOutline className='black'/>, <TiMediaStopOutline className='black'/>, <TiStarOutline className='black'/>, <TiStarOutline className='purple'/>, <TiStarOutline className='black'/>, <TiMediaStop className='orange'/>, <TiTimes className='orange'/>, <TiStar className='orange'/>, 
    
    <TiMediaRecordOutline className='black'/>, <TiMediaRecord className='red'/>, <TiStar className='black'/>, <TiMediaStopOutline className='black'/>, <TiMediaRecordOutline className='blue'/>, <TiMediaStop className='black'/>, <TiMediaRecordOutline className='black'/>, <TiMediaRecord className='cyan'/>, <TiStarOutline className='cyan'/>, <TiStar className='magenta'/>, <TiMediaRecordOutline className='magenta'/>, 
    
    <TiMediaStop className='yellow'/>, <TiTimesOutline className='yellow'/>, <TiTimes className='yellow'/>, <TiMediaRecord className='yellow'/>, <TiTimesOutline className='blue'/>, <TiMediaRecordOutline className='black'/>, <TiStarOutline className='purple'/>, <TiMediaStop className='cyan'/>, <TiStar className='black'/>, <TiMediaStopOutline className='black'/>, <TiTimes className='black'/>, 
    
    <TiStarOutline className='black'/>, <TiMediaStopOutline className='black'/>, <TiStarOutline className='black'/>, <TiMediaStopOutline className='black'/>, <TiStarOutline className='black'/>, <TiMediaRecordOutline className='black'/>, <TiMediaStopOutline className='black'/>, <TiStar className='black'/>, <TiTimesOutline className='black'/>, <TiMediaRecordOutline className='magenta'/>, <TiStarOutline className='magenta'/>, 
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


