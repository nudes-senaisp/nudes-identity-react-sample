import { handle } from 'redux-pack';

import defaultRequestInitialStateFactory from './defaultRequestInitialStateFactory';

function defaultRequestReducerFactory(
  reqAction,
  clearAction,
  initialState = defaultRequestInitialStateFactory(),
) {
  return function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case reqAction:
        return handle(state, action, {
          start: (prevState) => ({
            ...prevState,
            isLoading: true,
            error: null,
          }),
          finish: (prevState) => ({ ...prevState, isLoading: false }),
          failure: (prevState) => ({ ...prevState, error: payload }),
          success: (prevState) => ({ ...prevState, data: payload }),
        });
      case clearAction:
        return initialState;
      default:
        return state;
    }
  };
}

export default defaultRequestReducerFactory;
