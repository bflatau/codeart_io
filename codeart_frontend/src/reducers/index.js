import { combineReducers } from 'redux';
// Import all the reducers...
import app from './app';
import api from './api';

// Combine all reducers into a single reducer for Redux to run
export const reducer = combineReducers({
  app,
  api
});
