import React, {Component} from 'react';
import './styles.scss';
import { Helmet } from 'react-helmet';
import InputWallConnector from '../../components/InputWall';
import OutputWallConnector from '../../components/OutputWall';
import DebugPanelConnector from '../../components/DebugPanel';
import DropDownMenuConnector from '../../components/DropDownMenu';

export default class HomeView extends Component {

  componentDidMount() {
    console.log('home page mounted!')
  }

  render() {      
      return (
          <div className='home-content-container'>
          
            <Helmet>
              <title>I/O</title>
                <meta
                  name="Home"
                  content="I/O Input, Output"
                />
            </Helmet>
            <DropDownMenuConnector/>
            <InputWallConnector/>
            <OutputWallConnector/>
            <DebugPanelConnector/>
            
          </div>
      );
  }
}

