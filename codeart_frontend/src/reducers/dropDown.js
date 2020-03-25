import createReducer from '../utils/createReducer';
import { outputBoardNumber }  from '../constants/appData/outputBoard';
import { SET_GAME_VALUE } from '../constants/actions';


const initialState = {
    gameValue: null
};


export default createReducer(initialState, {

    [SET_GAME_VALUE]: (state, action) => {
        return {
                ...state,
                gameValue: action.data,
        };  
    },

});