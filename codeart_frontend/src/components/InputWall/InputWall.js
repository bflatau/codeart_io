import React from 'react';
import './styles.scss';
import { Helmet } from 'react-helmet';
import { storyPeople } from '../../constants/appData/people';
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

          <div> sup now</div>
        </div>
    
		);
	}
}

export default InputWall;