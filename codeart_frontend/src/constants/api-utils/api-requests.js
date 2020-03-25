
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