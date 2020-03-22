import React from 'react';
import './styles.scss';
import { Helmet } from 'react-helmet';
import { inputBoardNumber } from '../../constants/appData/inputBoard';
import { Redirect} from 'react-router-dom';



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
                <div 
                    key={i+1} 
                    onClick={()=>alert('you clicked ' + (i + 1))} 
                    className= {(i === 20) ? 'input-button-active' : 'input-button'}
                >

                    {i +1} 

                </div>
            )
        } 
        return table
      }
	

	
	render () {

		return (

		    <div className="person-content-container">
                <Helmet>
                    <title>Oral History</title>
                    <meta
                    name="Person"
                    content="person's name maybe?"
                    />
                </Helmet>

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