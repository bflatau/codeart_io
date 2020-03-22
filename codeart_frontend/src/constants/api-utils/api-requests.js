export function getRequest() {

  const url = 'http://localhost:8080/story';
  return fetch(url).then(response => response.json());
}




// export function getRequest() {

//     const requestUrl = {
//         Multimedia: `http://localhost:8080/joe/photos/images?year=${req.subcat}`,
//         Stories: `http://localhost:8080/joe/stories/story?category=${req.subcat}`,
//         About: `http://localhost:8080/joe/stories/story?category=${req.subcat}`,
//     }

//     const url = requestUrl[req.maincat];

//     console.log('this is the get request url', url);

//     return fetch(url).then(response => response.json());
// }