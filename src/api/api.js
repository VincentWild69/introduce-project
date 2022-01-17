import * as axios from 'axios';

//использую соединение через прокси, чтобы можно было делать запросы в обход корс ошибки, настройки прокси в файле setupProxy.js

export const quoteAPI = {
  getQuote: (lang) => {
    return axios.get(`/api/1.0/?method=getQuote&format=json&lang=${lang}`).then(response => response.data)
  },


}
