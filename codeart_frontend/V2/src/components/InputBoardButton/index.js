import React, { Component } from "react";
import './style.css';

class InputBoardButton extends Component {
    constructor() {
        super();
        this.state = {
            buttonOn: false
        };
    }

    // componentDidMount() {
    //     this.props.socket.on('connected users', (data) => {
    //         this.setState({ numberOfUsers: data })
    //     })
    // }

    render() {

        return (
            <div 
                className="input-board-button"
                onClick={()=>{
                        (this.state.buttonOn) ? this.setState({ buttonOn: false }) : this.setState({ buttonOn: true })
                    }
                }
            >

                {(this.state.buttonOn) ? 'I' : 'O'}

            </div> 
        )
    }
}
export default InputBoardButton;


