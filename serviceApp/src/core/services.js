import axios from 'axios';
import { API_BASE_URL } from 'config';

axios.defaults.baseURL = API_BASE_URL;

export const setAuthHeaders = authToken => {
  GLOBAL_TOKEN = `${authToken}`;
  axios.defaults.headers.common.Authorization = `${authToken}`;
};

export const GET = location => {
  return axios
    .get(location)
    .then(response => {
      if (response.statusText === 'OK') {
        return response.data;
      }
      throw new Error('API FAILS', response.data);
    })
    .catch(error => {
      throw error.response.data || error.message || 'NETWORK ERROR';
    });
};

export const POST = (location, body) =>
  axios
    .post(location, body)
    .then(response => {
      if (response.statusText === 'OK') {
        return response.data;
      }
      throw new Error('API FAILS', response.data);
    })
    .catch(error => {
      throw error.response.data || error.message || 'NETWORK ERROR';
    });
export const FILEUPLOAD = (location, body) => {
  return axios({
    method: 'post',
    url: location,
    data: body,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
    .then(response => response)
    .catch(err => err);
  // return axios
  //   .post(location, body, config)
  //   .then(response => {
  //     if (response.statusText === 'OK') {
  //       return response.data;
  //     }
  //     throw new Error('API FAILS', response.data);
  //   })
  //   .catch(error => {
  //     throw error.response.data || error.message || 'NETWORK ERROR';
  //   });
};

export const PUT = (location, body) => {
  return axios
    .put(location, body)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error.response.data || error.message || 'NETWORK ERROR';
    });
};
