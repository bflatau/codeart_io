import React from 'react';
import './styles.scss';
import { outputBoardNumber } from '../../constants/appData/outputBoard';




class OutputWall extends React.Component {

    createOutputGrid = () => {
        let table = []
    
        for (let i = 0; i < outputBoardNumber; i++) {
          
            table.push(

                <div key={i+1} className="output-board-item" >
                    {i +1 }
                </div>
            )
        } 
        return table
      }

		
	render () {
		return (
            <div className='output-container'>
                {this.createOutputGrid()}
            </div> 
		);
	}
}

export default OutputWall;