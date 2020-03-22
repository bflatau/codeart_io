import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PersonView from './PersonView';
import * as appActions  from '../../actionCreators';


function select(state) {

    return {
        api: state.api
    };
}

class PersonViewConnector extends Component {

    render() {

        const { dispatch, history } = this.props;

        return (
            <PersonView
                {...this.props.api}
                {...history}
                {...bindActionCreators(appActions, dispatch)}
            />
        );
    }

}

export default withRouter(connect(select)(PersonViewConnector));











// import React from 'react';
// import { connect } from 'react-redux';
// import PersonView from './PersonView';
// import { withRouter } from 'react-router';


// //define parts of state that are available props??
// const PersonViewContainer = ({ app, api, history }) => (
//   <PersonView
//     app={app}
//     api={api}
//     history={history}
//   />
// );


// //this is from reducer --> and maps to props defined in container??
// const mapStateToProps = ({ app, api }) => ({
//   app,
//   api,
// });

// export default withRouter(connect(mapStateToProps)(PersonViewContainer));