import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DropDownMenu from './dropDownMenu';
import * as appActions  from '../../actionCreators';


function select(state) {

    return {
        inputButtons: state.inputButtons
    };
}

class DropDownMenuConnector extends Component {

    render() {

        const { dispatch, history } = this.props;

        return (
            <DropDownMenu
                {...this.props.api}
                {...this.props.inputButtons}
                {...history}
                {...bindActionCreators(appActions, dispatch)}
            />
        );
    }

}

export default withRouter(connect(select)(DropDownMenuConnector));