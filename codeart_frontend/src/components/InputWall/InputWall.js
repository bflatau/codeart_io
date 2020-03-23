import React from 'react';
import './styles.scss';
import { inputBoardNumber } from '../../constants/appData/inputBoard';
import InputWallButtonConnector from '../InputWallButton/';



class InputWall extends React.Component {

    createInputGrid = () => {
        let table = []
    
        for (let i = 0; i < inputBoardNumber; i++) {
          
            table.push(

                <InputWallButtonConnector 
                    key={i+1} 
                    buttonPosition={i + 1}
                />
            )
        } 
        return table
      }
		
	render () {
		return (
		   
            <div className='input-container'>
                <div className='input-header'>Number of Keys Left: <span className='input-header-highlight'>{this.props.numberOfKeys}</span></div>
                <div className='input-board'>
                    {this.createInputGrid()}
                </div> 
            </div>
           
		);
	}
}

export default InputWall;