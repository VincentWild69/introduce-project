import * as axios from 'axios';

// const fetchQuote = axios.create(
//   {
//     baseURL: 'https://api.forismatic.com/api/1.0/'
//   }
// )



export const quoteAPI = {
  getQuote: (lang) => {
    return axios.get(`/api/1.0/?method=getQuote&format=json&lang=${lang}`).then(response => response.data)
  },

  getUser: () => {
    return axios.get().then(response => response.data);
  }

}
