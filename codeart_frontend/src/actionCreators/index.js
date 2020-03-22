import {
  API_REQUEST,
  API_RESPONSE,
  API_RESET,
  APPLICATION_LOADED
} from '../constants/actions';

import{ getRequest } from '../constants/api-utils/api-requests';


export function apiRequested() {
    return dispatch => {
        dispatch({
            type: API_REQUEST
        });

        setTimeout(() => {
            getRequest().then(data => {
                dispatch(dataFetched(data))
            });

        }, 2000);
    }
}

export function dataFetched(response) {
    const responseArray = [];

    for(let i = 0; i< response.length; i++){
        responseArray.push(response[i]);
    }

    return {
        type: API_RESPONSE,
        data: {
            // ...response
            responseArray
        }
    };
}

export function resetApiData() {
    return {
        type: API_RESET
    };
}