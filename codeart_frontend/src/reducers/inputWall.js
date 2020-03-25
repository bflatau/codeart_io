import createReducer from '../utils/createReducer';

import { INPUT_BUTTON_ON } from '../constants/actions';
import { INPUT_BUTTON_OFF } from '../constants/actions';
import { GAME_KEYS_RESPONSE } from '../constants/actions';
import { TURN_INPUT_OFF } from '../constants/actions';
import { TURN_INPUT_ON } from '../constants/actions';



const initialState = {
    numberOfKeys: '?',
    boardActive: true
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
    },

    [TURN_INPUT_OFF]: (state) => {
        return {
            ...state,
            boardActive: false
        };
    },

    [TURN_INPUT_ON]: (state) => {
        return {
            ...state,
            boardActive: true
        };
    }
});