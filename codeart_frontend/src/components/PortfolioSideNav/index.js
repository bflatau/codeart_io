import React, { Component } from 'react';
import { connect } from 'react-redux';
import PortfolioSideNav from './PortfolioSideNav';
import { withRouter } from 'react-router';

class PortfolioSideNavConnector extends Component {
  componentDidMount() {
    window.onpopstate = () => this.forceUpdate();
  }
  render = () => {
    const { history,  sideNavItems } = this.props;
    return (
      <PortfolioSideNav
        history={history}
        sideNavItems={sideNavItems}
      />
    );
  };
}

//this is from the reducer index file
const mapStateToProps = ({
  portfolioSideNav: {  sideNavItems },
}) => ({  sideNavItems });

//withrouter adds history object
export default withRouter(connect(mapStateToProps)(PortfolioSideNavConnector));
