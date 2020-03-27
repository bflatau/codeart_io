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
		const {numberOfKeys, inputButtonOn, inputButtonOff, buttonValue, getGridValues, gameValue, boardActive, activateInputBoard} = this.props;
		// (boardActive === false) ? this.setState({buttonOn: false}) : null;
		return (
		    <div 
                className= {(this.state.buttonOn === true ) ? 'input-button-active' : 'input-button'}
                
				onClick={(this.state.buttonOn === false && numberOfKeys > 0 ) ? 
				
				()=>{
					// (boardActive === false) ? activateInputBoard() : null;
					this.setState({buttonOn: true})
					inputButtonOn(numberOfKeys);
					getGridValues(`game/${gameValue}/on/${buttonValue}`);
					
					} :
					
					(this.state.buttonOn === true) ?
					
					()=>{
						this.setState({buttonOn: false})
						inputButtonOff(numberOfKeys);
						getGridValues(`game/${gameValue}/off/${buttonValue}`);
					}
					: 
					()=>{alert('No more keys!')}

				}
				







				// onClick={(this.state.buttonOn === true ) ? 
				
				// 	()=>{
				// 		this.setState({buttonOn: false})
				// 		inputButtonOff(numberOfKeys);
				// 		getGridValues(`update/${gameValue}/${0}/${buttonValue}`);
				// 		} :
						
				// 		(numberOfKeys > 0) ?
						
				// 		()=>{
				// 			this.setState({buttonOn: true})
				// 			inputButtonOn(numberOfKeys);
				// 			getGridValues(`update/${gameValue}/${1}/${buttonValue}`);
				// 		}
				// 		: 
				// 		()=>{alert('No more keys!')}

				// 	}
            
            >
					


					{buttonValue}
            </div>
		);
	}
}

export default InputWallButton;