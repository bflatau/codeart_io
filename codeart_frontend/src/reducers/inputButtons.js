import createReducer from '../utils/createReducer';
import { bufferArrayResults } from '../constants/api-utils/api-loading-value';

import { INPUT_BUTTON_ON } from '../constants/actions';
import { INPUT_BUTTON_OFF } from '../constants/actions';



const initialState = {
    numberOfKeys: 4,
};


export default createReducer(initialState, {

    [INPUT_BUTTON_ON]: (state, action) => {
        return {
                ...state,
                numberOfKeys: action.data
        };  
    },

    [INPUT_BUTTON_OFF]: (state, action) => {
        return {
            ...state,
            numberOfKeys: action.data
        };
    }
});