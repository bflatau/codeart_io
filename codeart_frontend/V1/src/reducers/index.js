import { combineReducers } from 'redux';
// Import all the reducers...
import outputWall from './outputWall';
import inputWall from './inputWall';
import dropDown from './dropDown';

// Combine all reducers into a single reducer for Redux to run
export const reducer = combineReducers({
  outputWall,
  inputWall,
  dropDown
});
