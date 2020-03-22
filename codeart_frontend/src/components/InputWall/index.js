import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InputWall from './InputWall';
import * as appActions  from '../../actionCreators';


function select(state) {

    return {
        api: state.api
    };
}

class InputWallConnector extends Component {

    render() {

        const { dispatch, history } = this.props;

        return (
            <InputWall
                {...this.props.api}
                {...history}
                {...bindActionCreators(appActions, dispatch)}
            />
        );
    }

}

export default withRouter(connect(select)(InputWallConnector));