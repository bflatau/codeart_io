import React from 'react';
import './styles.scss';


class DebugPanel extends React.Component {
	constructor (props) {
		super(props);
	}
	
	render () {
		const {apiData, apiDataLoaded} = this.props;

		return (
		    <div className='debug-panel-container'>

				{(!apiDataLoaded) ? apiData : apiData.data }
            </div>
		);
	}
}

export default DebugPanel;