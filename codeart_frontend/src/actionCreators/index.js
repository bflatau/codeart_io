import {
  API_REQUEST,
  API_RESPONSE,
  API_RESET,
  APPLICATION_LOADED,
  INPUT_BUTTON_ON,
  INPUT_BUTTON_OFF
} from '../constants/actions';

import{ getRequest } from '../constants/api-utils/api-requests';


export function apiRequested(requestURL) {
    return dispatch => {
        dispatch({
            type: API_REQUEST
        });

        setTimeout(() => {
            getRequest(requestURL).then(data => {
                dispatch(dataFetched(data))
            });

        }, 500);
    }
}

export function dataFetched(response) {
    // const responseArray = [];

    // for(let i = 0; i< response.length; i++){
    //     responseArray.push(response[i]);
    // }

    return {
        type: API_RESPONSE,
        data: {
            ...response
            // responseArray
        }
    };
}

export function resetApiData() {
    return {
        type: API_RESET
    };
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