import createReducer from '../utils/createReducer';
import { APPLICATION_LOADED } from '../constants/actions';

const initialState = {
  isLoading: true,
};

export default createReducer(initialState, {
  [APPLICATION_LOADED]: state => ({
    ...state,
    isLoading: false,
  }),
});
