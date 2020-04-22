import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loadUser } from 'redux-oidc';

import api from '@/utils/request';
import { createRootReducer } from '../reducer';
import userManager from '../userManager';

export default function configureStore(initialState) {
  const middleware = [thunk.withExtraArgument(api)];

  userManager.events.addUserSignedOut((e) => {
    userManager.removeUser();
  });

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (
    isDevelopment &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
  ) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line
  }

  const rootReducer = createRootReducer();

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers),
  );

  loadUser(store, userManager);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducer', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
}
