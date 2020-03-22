import React, { Component, } from 'react';
import GoogleAnalytics from 'react-ga';
import ReactGA from 'react-ga';

GoogleAnalytics.initialize('UA-30573220-2');

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
}



// const withTracker = (WrappedComponent, options = {}) => {
//   const trackPage = page => {
//     GoogleAnalytics.set({
//       page,
//       ...options,
//     });
//     GoogleAnalytics.pageview(page);
//   };

//   // eslint-disable-next-line
//   const HOC = class extends Component {
//     componentDidMount() {
//       // eslint-disable-next-line
//       const page = this.props.location.pathname + this.props.location.search;
//       trackPage(page);
//       console.log('tracking', page)
//     }

//     componentDidUpdate(prevProps) {
//       const currentPage =
//         prevProps.location.pathname + prevProps.location.search;
//       const nextPage =
//         this.props.location.pathname + this.props.location.search;

//       if (currentPage !== nextPage) {
//         trackPage(nextPage);
//         console.log('tracking', page)
//       }
//     }

//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   };

//   return HOC;
// };

// export default withTracker;