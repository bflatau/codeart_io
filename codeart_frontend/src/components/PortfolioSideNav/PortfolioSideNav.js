import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import './styles.scss';
import { NavLink } from 'react-router-dom';

export default class PortfolioSideNav extends Component {
  render() {
    const { sideNavItems } = this.props;

    return (
      <MediaQuery minWidth={1025}>
        <div className="portfolio-side-nav-menu">
          {sideNavItems.map(({ text, redirectURL }, id) => (
            <div key={`${id}-A`} className={'portfolio-side-nav-menu__item-container'}>
              <NavLink
                activeClassName="portfolio-side-nav-menu__item--active"
                className="portfolio-side-nav-menu__item"
                exact
                key={text}
                onClick={() => {
                  const node = document.getElementById(redirectURL);
                  if (node)
                    redirectURL !== 'Home'
                      ? node.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        })
                      : node.scrollIntoView();
                }}
                to={
                  text === 'Home' ? '/portfolio' : `/portfolio/${redirectURL}`
                }
              >
                {text}
              </NavLink>

              {id === 0 ? (
                <div
                  key={`${id}-B`}
                  className="portfolio-side-nav-sub-header"
                />
              ) : null}
            </div>
          ))}
        </div>
      </MediaQuery>
    );
  }
}
