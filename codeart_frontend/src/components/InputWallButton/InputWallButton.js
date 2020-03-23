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
		const {numberOfKeys, inputButtonOn, inputButtonOff, buttonPosition} = this.props;
		return (
		    <div 
                className= {(this.state.buttonOn === true) ? 'input-button-active' : 'input-button'}
                onClick={(this.state.buttonOn === true ) ? 
				
					()=>{
						this.setState({buttonOn: false})
						inputButtonOff(numberOfKeys);
						} :
						
						(numberOfKeys > 0) ?
						()=>{
							this.setState({buttonOn: true})
							inputButtonOn(numberOfKeys)
						}
						: 
						()=>{alert('No more keys!')}

					}
            
            >

					{buttonPosition}
            </div>
		);
	}
}

export default InputWallButton;