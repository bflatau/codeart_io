import React from 'react';
import './styles.scss';
import { outputBoardNumber } from '../../constants/appData/boardData';

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
        const {outputWallData, outputWallDataLoaded} = this.props;
		return (
            <div className='output-container'>
                {this.createOutputGrid(outputWallData, outputWallDataLoaded)}
            </div> 
		);
	}
}

export default OutputWall;