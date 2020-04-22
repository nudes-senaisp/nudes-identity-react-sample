import { isEmpty } from 'lodash';

const successRequestHandler = (res) => res.data;

const errorRequestHandler = (err) => {
  const { response } = err;

  if (isEmpty(response)) {
    return Promise.reject({
      status: 500,
      message: 'Internal Server Error',
    });
  }

  const { status } = response;

  if (response.status === 400) {
    const { data } = response;
    const { Errors: errors } = data;

    return Promise.reject({
      status,
      message: 'Bad Request',
      errors,
    });
  }

  if (response.status === 401) {
    return Promise.reject({
      status,
      message: 'Unauthorized',
    });
  }

  if (response.status === 403) {
    const {
      data: { Errors: errors },
    } = response;

    return Promise.reject({
      status,
      message: 'Forbidden',
      errors,
    });
  }

  return Promise.reject({
    status: response.status,
    message: 'Internal Server Error',
  });
};

export default {
  success: successRequestHandler,
  error: errorRequestHandler,
};
