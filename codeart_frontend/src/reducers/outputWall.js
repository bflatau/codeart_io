import createReducer from '../utils/createReducer';
import { bufferArrayResults } from '../constants/api-utils/api-loading-value';
import { outputBoardNumber }  from '../constants/appData/outputBoard';
import { REQUESTED_OUTPUT_VALUE_RESPONSE } from '../constants/actions';

function generateStartArray() {
    const startArray = [];
    for (let i = 0; i < outputBoardNumber; i++){
        startArray.push(i);
    }

    return startArray;
}


const initialState = {
    // outputWallData: bufferArrayResults(),
    outputWallData: generateStartArray(),
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

});