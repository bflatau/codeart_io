import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InputWallButton from './InputWallButton';
import * as appActions  from '../../actionCreators';


function select(state) {

    return {
        outputWall: state.outputWall,
        inputButtons: state.inputButtons
    };
}

class InputWallButtonConnector extends Component {

    render() {
        const { dispatch, history, buttonPosition} = this.props;

        return (
            <InputWallButton
                {...this.props.outputWall}
                {...this.props.inputButtons}
                buttonPosition={buttonPosition}
                {...history}
                {...bindActionCreators(appActions, dispatch)}
            />
        );
    }

}

export default withRouter(connect(select)(InputWallButtonConnector));