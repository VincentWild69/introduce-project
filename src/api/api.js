import * as axios from 'axios';


export const quoteAPI = {
  getQuote: (lang) => {
    return axios.get(`/api/1.0/?method=getQuote&format=json&lang=${lang}`).then(response => response.data)
  },


}
