import React from 'react';
import './styles.scss';


// class DebugPanel extends React.Component {
// 	constructor (props) {
// 		super(props);
// 	}
	
// 	render () {
// 		const {outputWallData, outputWallDataLoaded} = this.props;

// 		return (
// 		    <div className='debug-panel-container'>

// 				{(!outputWallDataLoaded) ? outputWallData : outputWallData.data }
//             </div>
// 		);
// 	}
// }

// export default DebugPanel;







export default function DebugPanel(props) {
	const {outputWallDataLoaded, outputWallData} = props;
	return (
		<div className='debug-panel-container'>

			{(!outputWallDataLoaded) ? outputWallData : outputWallData.data }
		</div>
	);
}
