import createReducer from '../utils/createReducer';

import { INPUT_BUTTON_ON } from '../constants/actions';
import { INPUT_BUTTON_OFF } from '../constants/actions';
import { GAME_KEYS_RESPONSE } from '../constants/actions';



const initialState = {
    numberOfKeys:'Pick A Game!',
};


export default createReducer(initialState, {

    [GAME_KEYS_RESPONSE]: (state, action) => {
        return {
                ...state,
                numberOfKeys: action.data.data
        };  
    },

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