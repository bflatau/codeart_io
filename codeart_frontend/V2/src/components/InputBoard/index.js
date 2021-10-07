import React, { Component } from "react";
import './style.css';
import InputBoardButton from '../InputBoardButton';
import Select from 'react-select';
import {apiURL} from '../../constants';

// import { TiTimesOutline, TiTimes, TiStarOutline, TiStar,  TiMediaStopOutline, TiMediaStop, TiMediaRecord, TiMediaRecordOutline } from "react-icons/ti";

const boxLayouts = [
    {position: 0, symbol: '$', color: 'yellow'},  // 0
    {position: 0, symbol: '*', color: 'pink'},    // 1

    {position: 1, symbol: '%', color: 'yellow'},  // 2
    {position: 1, symbol: '!', color: 'orange'},  // 3

    {position: 2, symbol: '@', color: 'pink'},    // 4
    {position: 2, symbol: '&', color: 'green'},   // 5

    {position: 3, symbol: '#', color: 'pink'},    // 6
    {position: 3, symbol: '?', color: 'yellow'},  // 7

    {position: 4, symbol: '$', color: 'orange'},  // 8
    {position: 4, symbol: '*', color: 'pink'},    // 9

    {position: 5, symbol: '%', color: 'orange'},  // 10
    {position: 5, symbol: '!', color: 'orange'},  // 11

    {position: 6, symbol: '@', color: 'green'},   // 12
    {position: 6, symbol: '&', color: 'green'},   // 13

    {position: 7, symbol: '#', color: 'green'},   // 14
    {position: 7, symbol: '?', color: 'yellow'},  // 15

    {position: 8, symbol: '#', color: 'yellow'},  // 16
    {position: 8, symbol: '?', color: 'yellow'},  // 17

    {position: 9, symbol: '$', color: 'yellow'},  // 18
    {position: 9, symbol: '*', color: 'green'},   // 19

    {position: 10, symbol: '%', color: 'pink'},   // 20
    {position: 10, symbol: '!', color: 'orange'}, // 21

    {position: 11, symbol: '@', color: 'pink'},   // 22
    {position: 11, symbol: '&', color: 'pink'},   // 23

    {position: 12, symbol: '#', color: 'orange'}, // 24
    {position: 12, symbol: '?', color: 'yellow'}, // 25

    {position: 13, symbol: '$', color: 'orange'}, // 26
    {position: 13, symbol: '*', color: 'green'},  // 27

    {position: 14, symbol: '%', color: 'green'},  // 28
    {position: 14, symbol: '!', color: 'orange'}, // 29

    {position: 15, symbol: '@', color: 'green'},  // 30
    {position: 15, symbol: '&', color: 'pink'},   // 31

    {position: 16, symbol: '@', color: 'yellow'}, // 32
    {position: 16, symbol: '&', color: 'pink'},   // 33

    {position: 17, symbol: '#', color: 'yellow'}, // 34
    {position: 17, symbol: '?', color: 'orange'}, // 35
    
    {position: 18, symbol: '*', color: 'green'},  // 36
    {position: 18, symbol: '$', color: 'pink'},   // 37

    {position: 19, symbol: '!', color: 'yellow'}, // 38
    {position: 19, symbol: '%', color: 'pink'},   // 39
   
    {position: 20, symbol: '@', color: 'orange'}, // 40
    {position: 20, symbol: '&', color: 'pink'},   // 41

    {position: 21, symbol: '?', color: 'orange'}, // 41
    {position: 21, symbol: '#', color: 'orange'}, // 42
    
    {position: 22, symbol: '$', color: 'green'},  // 43
    {position: 22, symbol: '*', color: 'green'},  // 44

    {position: 23, symbol: '!', color: 'yellow'}, // 45
    {position: 23, symbol: '%', color: 'green'},  // 46
    

]

const gameDropDownList = [
  { value: '0', label: '[ FOUR STRIPES ] The first bud of spring sings the other seeds into joining her uprising' },
  { value: '1', label: '[ & ] technology is a useful servant but a dangerous master' },
  { value: '2', label: '[ ! ] the future is here its just not widely distributed yet' },
  { value: '3', label: '[ $ ] if you can control the meaning of words you can control the people who must use them' },
  { value: '4', label: '[ GREEN ] when you want to know how things really work study them when theyre coming apart' },
  { value: '5', label: '[ @ ] through the machineries of greed pettiness and abuse of power love occurs' },
  { value: '6', label: '[ * ] the norms and notions of what just is isnt always justice' },
  { value: '7', label: '[ % ] language is to the mind more than light is to the eye' },
  { value: '8', label: '[ ? ] you can tune a guitar but you cant tuna fish unless of course you play bass' },
  { value: '9', label: '[ ORANGE ] of all the sad words of tongue or pen the saddest are these it might have been' },
];
 


class InputBoard extends Component {
    constructor() {
        super();
        this.state = {
            numberOfUsers: 0,
            boardSymbols: Array(24).fill('X'),
            boardColors: Array(24).fill('black'),
            selectedOption: null
        };
    }


    handleDropDown= (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption.value);
      fetch(`${apiURL}/game`, {
     
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
            game: selectedOption.value,
        }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => console.log(response))
    };

    componentDidMount() {
        this.props.socket.on('connected users', (data) => {
            this.setState({ numberOfUsers: data.numberOfUsers })
        })

        this.props.socket.on('button down', (data) => {
            console.log('socket data', data)
            this.updateInputBoardLayout(data.buttons);
        })

        this.props.socket.on('button up', (data) => {
            this.updateInputBoardLayout(data.buttons);
        })
    }


    updateInputBoardLayout = i => { // i = pin number
        this.setState(state => {
        //const value has to be the same as state value setState (key:value)
          const boardSymbols= state.boardSymbols.map((item, j) => {
            
            if (i != null && j === boxLayouts[i].position && item !== boxLayouts[i].symbol) {
              return boxLayouts[i].symbol;
            } 
            else if(i != null && j === boxLayouts[i].position  && item === boxLayouts[i].symbol) {
              return 'X';
            } 
            
            else{
                return item;
            }
          });

          const boardColors = state.boardColors.map((item, j) => {
           
            if (i != null && j === boxLayouts[i].position && item !== boxLayouts[i].color) {
              return boxLayouts[i].color;
            } 
            else if(i != null && j === boxLayouts[i].position  && item === boxLayouts[i].color) {
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
      const { selectedOption } = this.state;

      const customStyles = {
        menu: (provided, state) => ({
          ...provided,
          // backgroundColor: 'red',
          zIndex: 999
        }),
      }



        return (
            <div className="input-board-container">
                <div className="input-board-users">
                  People Playing: {this.state.numberOfUsers}
                </div>
                <div className="input-board-game-select">
                  <Select
                    styles={customStyles}
                    value={selectedOption}
                    onChange={this.handleDropDown}
                    options={gameDropDownList}
                    placeholder={'Select a Game'}
                  />
                </div>
                <div className="input-board">
                    {this.createInputGrid()}
                </div>
            </div>
        )
    }
}
export default InputBoard;


