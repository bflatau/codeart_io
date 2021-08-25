import React, { Component } from "react";
import './style.css';


class OutputBoard extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         boardOutputs: Array(24).fill('O'),
    //     };
    // }

    // componentDidMount() {
    //     this.props.socket.on('connected users', (data) => {
    //         this.setState({ numberOfUsers: data.numberOfUsers })
    //     })

    //     this.props.socket.on('button down', (data) => {
    //         this.updateBoardArray(data);
    //     })

    //     this.props.socket.on('button up', (data) => {
    //         this.updateBoardArray(data);
    //     })
    // }


    // updateBoardArray = i => {
    //     this.setState(state => {
    //     //const value has to be the same as state value setState (key:value)
    //       const boardInputs = state.boardInputs.map((item, j) => {
    //         if (j === i && item !== 'I') {
    //           return 'I';
    //         } 
    //         else if(j === i && item === 'I') {
    //           return 'O';
    //         } 
    //         else{
    //             return item;
    //         }
    //       });
    //       return {
    //         boardInputs,
    //       };
    //     });
    //   };

    // createOutputGrid = () => {
    //     let table = [];

    //     for (let i = 0; i < this.state.boardOutputs.length; i++) {
    //         table.push(
    //             <InputBoardButton
    //                 key={i}
    //                 buttonID={i}
    //                 buttonValue={this.state.boardOutputs[i]}
    //                 socket={this.props.socket}
    //             />
    //         )
    //     }
    //     return table
    // }
    
    render() {
        return (
            <div className="output-board-container">
                HELLOOOOOOO
            </div>
        )
    }
}
export default OutputBoard;


