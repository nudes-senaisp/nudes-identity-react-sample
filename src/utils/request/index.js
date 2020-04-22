import axios from 'axios';

import axiosInstance from './axios';
import defaultRequestHandlers from './requestHandlers';

/**
 * Sends GET request to the specified URL.
 *
 * @param {String} url URL to send the GET request.
 */
export const get = (url) =>
  request(url, {
    method: 'GET',
  });

/**
 * Sends POST request to the specified URL with the specified body.
 *
 * @param {String} url URL to send the POST request.
 * @param {Object} data Data to be sended as request body.
 */
export const post = (url, data) =>
  request(url, {
    method: 'POST',
    data,
  });

/**
 * Sends PATCH request to the specified URL with the specified body.
 *
 * @param {String} url URL to send the PATCH request.
 * @param {Object} data Data to be sended as request body.
 */
export const patch = (url, data) =>
  request(url, {
    method: 'PATCH',
    data,
  });

/**
 * Sends PUT request to the URL with the specified body.
 *
 * @param {String} url URL to send the PUT request.
 * @param {Object} data Data to be sended as request body.
 */
export const put = (url, data) =>
  request(url, {
    method: 'PUT',
    data,
  });
/**
 * Sends DELETE request to the specified URL with the specified resource id.
 *
 * @param {String} url URL to send the PATCH request.
 * @param {Object} data Request body of the delete request.
 */
export const remove = (url, data) =>
  request(url, {
    method: 'DELETE',
    data,
  });

const {
  token: cancelToken,
  cancel: cancelRequest,
} = axios.CancelToken.source();

/**
 * Sends request to the specified URL using axios.
 *
 * @param {String} url URL to send the request.
 * @param {Object} requestParams Params to modify the axios request object.
 * @param {Function} requestParams.requestHandler Custom request handler to be used after the request is done. Defaults to the './defaultRequestHandler' export.
 * @param {Object} requestParams.contentType Content-Type of the request. Defaults to 'application-json'.
 * @param {Object} requestParams.authorization Authorization header of the request. Defaults to the token stored in the localStorage.
 */
export const request = (
  url,
  {
    successHandler = defaultRequestHandlers.success,
    errorHandler = defaultRequestHandlers.error,
    contentType = 'application/json',
    authorization = localStorage.getItem('token'),
    ...customOptions
  },
) => {
  const headers = {};

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  if (authorization) {
    headers['Authorization'] = `Bearer ${authorization}`; // eslint-disable-line
  }

  const options = {
    ...customOptions,
    cancelToken,
    headers,
  };

  return axiosInstance(url, options)
    .then(successHandler)
    .catch(errorHandler);
};

export default {
  get,
  post,
  patch,
  put,
  remove,
  request,
  cancelRequest,
};
