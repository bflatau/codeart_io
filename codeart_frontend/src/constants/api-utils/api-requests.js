
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
        .then(res => dataFetched(res, REQUESTED_OUTPUT_VALUE_RESPONSE ))
  }
}
