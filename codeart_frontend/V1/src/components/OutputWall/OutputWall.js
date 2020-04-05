import React from 'react';
import './styles.scss';

class OutputWall extends React.Component {

    createOutputGrid = (data, loaded) => {
        let table = []
        for (let i = 0; i < data.data.length; i++) {
          
            table.push(

                // <div key={i+1} className={(loaded === true && data.data[i] === 'X') ? "output-board-item-on": "output-board-item-off" } >
                <div key={i+1} className={`output-board-item-${data.data[i]}`} >
                    {/* {data.data[i] } */}

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