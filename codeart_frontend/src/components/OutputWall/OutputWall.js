import React from 'react';
import './styles.scss';
import { outputBoardNumber } from '../../constants/appData/outputBoard';




class OutputWall extends React.Component {

    createOutputGrid = (data, loaded) => {
        let table = []
    
        for (let i = 0; i < outputBoardNumber; i++) {
          
            table.push(

                <div key={i+1} className="output-board-item" >
                    {(!loaded) ? (data[i] + 1) : data.data[i] }
                </div>
            )
        } 
        return table
      }

		
	render () {
        const {apiData, apiDataLoaded} = this.props;
        console.log(apiData, 'this is api data');
		return (
            <div className='output-container'>
                {this.createOutputGrid(apiData, apiDataLoaded)}
            </div> 
		);
	}
}

export default OutputWall;