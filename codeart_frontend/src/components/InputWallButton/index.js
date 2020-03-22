import React from 'react';
import './styles.scss';


class InputWallButton extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			buttonOn: false,
		};

	}
	
	render () {
		return (
		    <div 
                className= {(this.state.buttonOn === true) ? 'input-button-active' : 'input-button'}
                onClick={()=> {(this.state.buttonOn === true) ? this.setState({buttonOn: false}) :
                
                this.setState({buttonOn: true})}}
            >

                {this.props.buttonPosition}

            </div>
		);
	}
}

export default InputWallButton;