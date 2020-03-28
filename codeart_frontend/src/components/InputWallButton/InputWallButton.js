import React from 'react';
import './styles.scss';


class InputWallButton extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			buttonOn: false,
			boardActive: this.props.boardActive
		};
		
	}


	componentDidUpdate(prevProps) {
		if (prevProps.boardActive !== this.props.boardActive) {
			this.setState({buttonOn: false})
		}
	  }


	
	render () {
		const {numberOfKeys, inputButtonOn, inputButtonOff, buttonValue, getGridValues, gameValue, outputWallData, sendBoardStatus} = this.props;
		return (
		    <div 
                className= {(this.state.buttonOn === true ) ? 'input-button-active' : 'input-button'}
                
				onClick={(this.state.buttonOn === false && numberOfKeys > 0 ) ? 
				
				()=>{
					this.setState({buttonOn: true})
					inputButtonOn(numberOfKeys);
					sendBoardStatus(`game/${gameValue}/on/${buttonValue}`, outputWallData);
					
					} :
					
					(this.state.buttonOn === true) ?
					
					()=>{
						this.setState({buttonOn: false})
						inputButtonOff(numberOfKeys);
						sendBoardStatus(`game/${gameValue}/off/${buttonValue}`, outputWallData);

					}
					: 
					()=>{alert('No more keys!')}

				}
			
            
            >
					


					{buttonValue}
            </div>
		);
	}
}

export default InputWallButton;