import { combineReducers } from 'redux';
// Import all the reducers...
import app from './app';
import api from './api';
import inputButtons from './inputButtons';

// Combine all reducers into a single reducer for Redux to run
export const reducer = combineReducers({
  app,
  api,
  inputButtons
});
