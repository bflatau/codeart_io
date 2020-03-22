import React from 'react';
import './styles.scss';
import { inputBoardNumber } from '../../constants/appData/inputBoard';
import InputWallButton from '../InputWallButton';



class InputWall extends React.Component {
	// constructor (props) {
	// 	super(props);

	// 	this.state = {
	// 		currentImageIndex: 0,
	// 		projectImages: this.props.images.map((picture) => {
	// 			const img = new Image();
	// 			img.src = picture;
	// 			return img
	// 		}) 
	// 	};

	// }

	
	
    componentDidMount() {
      console.log('loaded yo!');
    }
    

    createInputGrid = () => {
        let table = []
    
        for (let i = 0; i < inputBoardNumber; i++) {
          
            table.push(

                <InputWallButton 
                    key={i+1} 
                    buttonPosition={i + 1}
                />
            )
        } 
        return table
      }
	

	
	render () {

		return (

		    <div className="person-content-container">
                <div className='input-container'>
                    <div className='input-board'>
                       {this.createInputGrid()}
                    </div> 
                </div>






            </div>
		);
	}
}

export default InputWall;