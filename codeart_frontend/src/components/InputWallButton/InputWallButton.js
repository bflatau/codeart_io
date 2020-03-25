import React from 'react';
import './styles.scss';


class InputWallButton extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			buttonOn: false
		};
	}

	
	render () {
		const {numberOfKeys, inputButtonOn, inputButtonOff, buttonValue, getGridValues, gameValue} = this.props;

		return (
		    <div 
                className= {(this.state.buttonOn === true) ? 'input-button-active' : 'input-button'}
                onClick={(this.state.buttonOn === true ) ? 
				
					()=>{
						this.setState({buttonOn: false})
						inputButtonOff(numberOfKeys);
						getGridValues(`update/${gameValue}/${0}/${buttonValue}`);
						} :
						
						(numberOfKeys > 0) ?
						()=>{
							this.setState({buttonOn: true})
							inputButtonOn(numberOfKeys);
							getGridValues(`update/${gameValue}/${1}/${buttonValue}`);
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