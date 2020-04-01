import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import loggingMiddleware from '../middleware/loggingMiddleware';
import redirectMiddleware from '../middleware/redirectMiddleware';
import { reducer } from '../reducers';

// Compose the store function with middleware. Returns a function that will
// instantiate the store.
const composeStoreWithMiddleware = history =>
  compose(
    applyMiddleware(
      reduxThunk.withExtraArgument(history),
      loggingMiddleware,
      redirectMiddleware(history)
    )
  )(createStore)(reducer);

// Initialize the store with the top-level reducer function
const configureStore = history => composeStoreWithMiddleware(history);

export default configureStore;
