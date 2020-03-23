import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { withRouter } from 'react-router';

const AppHeader = ({ menuItemSelected }) => (
  <div className="header-container">
    <div className="header-logo-container">
      <div>
        <div className="header-logo-text"> Code Art 2020: I/O </div>
      </div>
    </div>
  </div>
);

export default withRouter(AppHeader);
