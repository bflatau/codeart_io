import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { withRouter } from 'react-router';
import AppFooter from '../../components/Footer';
import AppHeaderContainer from '../../components/Header';

const AppLayoutContainer = ({
  children,
  location,
}) => (
  <div id="App">
    <div className="app-side-nav-container">
    </div>
    <div id="Home" className="app-layout-container">
      <AppHeaderContainer />
      <main id="app-layout" className="app-layout__content">
        {children}
      </main>
      <AppFooter />
    </div>
  </div>
);

const mapStateToProps = ({
  app,
}) => ({
  app,
});

export default withRouter(connect(mapStateToProps)(AppLayoutContainer));
