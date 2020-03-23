import React, {Component} from 'react';
import './styles.scss';
import { Helmet } from 'react-helmet';
import InputWallConnector from '../../components/InputWall';
import OutputWallConnector from '../../components/OutputWall';

export default class HomeView extends Component {

  componentDidMount() {
    console.log('home page mounted!')
  }

//   handleLoginSubmitted = () => {
//       const { loginSubmitted } = this.props;
//       const username = this.refs.usernameInput.getValue();
//       const password = this.refs.passwordInput.getValue();

//       loginSubmitted(username, password);
//   };

//   handleInputKeyup = (e) => {
//       const { loginErrorCleared, errorMessage } = this.props;

//       if (e.keyCode === 13) {
//           this.handleLoginSubmitted();
//       } else if (errorMessage) {
//           loginErrorCleared();
//       }
//   }

  render() {
      const { loginSubmitted, errorMessage } = this.props;
      

      return (
          <div className='home-content-container'>
          
            <Helmet>
              <title>Code Art</title>
                <meta
                  name="Home"
                  content="I/O Input, Output"
                />
            </Helmet>

            <InputWallConnector/>
            <OutputWallConnector/>
            
          </div>
      );
  }
}

