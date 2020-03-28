import {
  REQUEST_OUTPUT_VALUES,
  REQUESTED_OUTPUT_VALUE_RESPONSE,
  INPUT_BUTTON_ON,
  INPUT_BUTTON_OFF,
  GET_GAME_KEYS,
  GAME_KEYS_RESPONSE,
  SET_GAME_VALUE,
  TURN_INPUT_OFF,
  TURN_INPUT_ON,
  SUBMIT_BOARD_STATUS
} from '../constants/actions';



export function apiRequest(requestURL, requestType, responseType) {
    return dispatch => {
        dispatch({
            type: requestType
        });
  
        setTimeout(() => {
            getRequest(requestURL).then(data => {
                dispatch(dataFetched(data, responseType))
            });
  
        }, 500);
    }
  }
  
  
  export function getRequest(endpoint) {
  
    const url = `http://localhost:8080/${endpoint}`;
    return fetch(url).then(response => response.json());
  }


  export function dataFetched(response, responseType) {
    return {
        type: responseType,
        data: {
            ...response
        }
    };
  }
  
  
  export function sendBoardStatus(endpoint, boardArray) {
  
    return dispatch => {
        dispatch({
            type: SUBMIT_BOARD_STATUS,
        });
  
        fetch(`http://localhost:8080/${endpoint}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({boardArray: boardArray})
          }).then(res=>res.json())
          .then(data => dispatch(dataFetched(data, REQUESTED_OUTPUT_VALUE_RESPONSE )))
    }
  }



//   export function sendBoardStatus(endpoint, boardArray) {
  
//     return dispatch => {
//         dispatch({
//             type: SUBMIT_BOARD_STATUS,
//         });
  
//         fetch(`http://localhost:8080/${endpoint}`, {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({boardArray: boardArray})
//           }).then(res=>res.json(), console.log(res))
//           .then(res => dataFetched(res, REQUESTED_OUTPUT_VALUE_RESPONSE ))
//     }
//   }


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

export function resetInputBoard(){
    return {
        type: TURN_INPUT_OFF
    };
}


export function activateInputBoard(){
    return {
        type: TURN_INPUT_ON
    };
}









