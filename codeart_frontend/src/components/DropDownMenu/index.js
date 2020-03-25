import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DropDownMenu from './dropDownMenu';
import * as appActions  from '../../actionCreators';


function select(state) {

    return {
        inputButtons: state.inputButtons,
        dropDown: state.dropDown
    };
}

class DropDownMenuConnector extends Component {

    render() {

        const { dispatch, history } = this.props;

        return (
            <DropDownMenu
                {...this.props.api}
                {...this.props.inputButtons}
                {...this.props.dropDown}
                {...history}
                {...bindActionCreators(appActions, dispatch)}
            />
        );
    }

}

export default withRouter(connect(select)(DropDownMenuConnector));