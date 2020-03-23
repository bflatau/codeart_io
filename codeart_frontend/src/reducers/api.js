import createReducer from '../utils/createReducer';
import { bufferArrayResults } from '../constants/api-utils/api-loading-value';
import { outputBoardNumber }  from '../constants/appData/outputBoard';

import { API_REQUEST } from '../constants/actions';
import { API_RESPONSE } from '../constants/actions';
import { API_RESET } from '../constants/actions';

function generateStartArray() {
    const startArray = [];
    for (let i = 0; i < outputBoardNumber; i++){
        startArray.push(i);
    }

    return startArray;
}


const initialState = {
    // apiData: bufferArrayResults(),
    apiData: generateStartArray(),
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
            // apiData: bufferArrayResults(), 
            apiData: generateStartArray(), 
            apiDataLoaded: false
        };
    }
});