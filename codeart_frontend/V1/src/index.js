/* React  and Redux */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { createBrowserHistory } from 'history';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
// import withTracker from './components/GoogleTracker';


import './assets/styles/style.scss';
import * as images from './assets/images/';
import * as pdfs from './assets/pdfs/';

import AppLayoutContainer from './views/layout';
import HomeView from './views/home';


// Creates the top-level application store with middleware. Exports the store
// for use in other modules.
const store = configureStore();

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppLayoutContainer>
        <Switch>
          {/* <Route exact path="/" component={withTracker(HomeView)} /> */}
          <Route exact path="/" render={() => <HomeView />} />
          <Redirect to="/" />
        </Switch>
      </AppLayoutContainer>
    </Router>
  </Provider>,
  document.getElementById('code-art-wrapper')
);
