import {
  REQUEST_OUTPUT_VALUES,
  REQUESTED_OUTPUT_VALUE_RESPONSE,
  INPUT_BUTTON_ON,
  INPUT_BUTTON_OFF,
  GET_GAME_KEYS,
  GAME_KEYS_RESPONSE,
  SET_GAME_VALUE
} from '../constants/actions';

import{ apiRequest } from '../constants/api-utils/api-requests';


export function getGridValues(requestURL){
    return apiRequest(requestURL, REQUEST_OUTPUT_VALUES, REQUESTED_OUTPUT_VALUE_RESPONSE);
}

export function getGameKeys(requestURL){
    return apiRequest(requestURL, GET_GAME_KEYS, GAME_KEYS_RESPONSE);
}



export function inputButtonOn(data){
    return {
        type: INPUT_BUTTON_ON,
        data: data -1
    };
}

export function inputButtonOff(data){
    return {
        type: INPUT_BUTTON_OFF,
        data: data + 1
    };
}


export function setGameValue(data){
    return {
        type: SET_GAME_VALUE,
        data: data
    };
}