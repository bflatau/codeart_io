import createReducer from '../utils/createReducer';
import { bufferArrayResults } from '../constants/api-utils/api-loading-value';

import { API_REQUEST } from '../constants/actions';
import { API_RESPONSE } from '../constants/actions';
import { API_RESET } from '../constants/actions';



const initialState = {
    apiData: bufferArrayResults(),
    apiDataLoaded: false
};


export default createReducer(initialState, {

    [API_RESPONSE]: (state, action) => {
        return {
                ...state,
                apiData: action.data,
                apiDataLoaded: true
        };  
    },

    [API_RESET]: (state, action) => {
        return {
            ...state,
            apiData: bufferArrayResults(), 
            apiDataLoaded: false
        };
    }
});