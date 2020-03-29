import createReducer from '../utils/createReducer';
import { outputBoardNumber }  from '../constants/appData/boardData';
import { REQUESTED_OUTPUT_VALUE_RESPONSE, RESET_OUTPUT_BOARD } from '../constants/actions';

import { SUBMIT_BOARD_STATUS } from '../constants/actions';


function generateStartArray() {
    const startArray = [];
    for (let i = 0; i < outputBoardNumber; i++){
        startArray.push(i);
    }

    return startArray;
}


const initialState = {
    outputWallData: {data: generateStartArray()},
    outputWallDataLoaded: false
};


export default createReducer(initialState, {

    [REQUESTED_OUTPUT_VALUE_RESPONSE]: (state, action) => {
        return {
                ...state,
                outputWallData: action.data,
                outputWallDataLoaded: true
        };  
    },

    [RESET_OUTPUT_BOARD]: (state, action) => { 

        return{
            ...state,
            outputWallData: {data: generateStartArray()},
        }
    },

});

