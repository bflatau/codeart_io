import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InputWallButton from './InputWallButton';
import * as appActions  from '../../actionCreators';


function select(state) {

    return {
        outputWall: state.outputWall,
        inputWall: state.inputWall,
        dropDown: state.dropDown
    };
}

class InputWallButtonConnector extends Component {

    render() {
        const { dispatch, history, buttonValue} = this.props;

        return (
            <InputWallButton
                {...this.props.outputWall}
                {...this.props.inputWall}
                {...this.props.dropDown}
                buttonValue={buttonValue}
                {...history}
                {...bindActionCreators(appActions, dispatch)}
            />
        );
    }

}

export default withRouter(connect(select)(InputWallButtonConnector));