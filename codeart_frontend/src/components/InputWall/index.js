import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InputWall from './InputWall';
import * as appActions  from '../../actionCreators';


function select(state) {

    return {
        outputWall: state.outputWall,
        inputButtons: state.inputButtons
    };
}

class InputWallConnector extends Component {

    render() {

        const { dispatch, history } = this.props;

        return (
            <InputWall
                {...this.props.outputWall}
                {...this.props.inputButtons}
                {...history}
                {...bindActionCreators(appActions, dispatch)}
            />
        );
    }

}

export default withRouter(connect(select)(InputWallConnector));