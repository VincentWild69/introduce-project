export const createAxiosError = (error, text = '', cb, dispatch = undefined) => {
  
  if (!dispatch) {
    if (error.response) {
      cb(`${text}. Error ${error.response.status}: ${error.response.data.message}`);
    } else {
      cb(`${text}. ${error}`);
    }
  } else {
    if (error.response) {
      dispatch(cb(`${text}. Error ${error.response.status}: ${error.response.data.message}`));
    } else {
      dispatch(cb(`${text}. ${error}`));
    }
  }
  
}