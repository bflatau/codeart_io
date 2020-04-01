import React from 'react';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import { withRouter } from 'react-router';

const AppHeaderContainer = ({ app, mainNavBar }) => (
  <AppHeader
    app={app}
    mainNavBar={mainNavBar}
  />
);

const mapStateToProps = ({ app, mainNavBar }) => ({
  app,
  mainNavBar,
});

export default withRouter(connect(mapStateToProps)(AppHeaderContainer));
