import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InputWallButton from './InputWallButton';
import * as appActions  from '../../actionCreators';


function select(state) {

    return {
        api: state.api,
        inputButtons: state.inputButtons
    };
}

class InputWallButtonConnector extends Component {

    render() {
        const { dispatch, history, buttonPosition} = this.props;

        return (
            <InputWallButton
                {...this.props.api}
                {...this.props.inputButtons}
                buttonPosition={buttonPosition}
                {...history}
                {...bindActionCreators(appActions, dispatch)}
            />
        );
    }

}

export default withRouter(connect(select)(InputWallButtonConnector));