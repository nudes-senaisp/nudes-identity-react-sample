import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { OidcProvider } from 'redux-oidc';

import configureStore from './state/store/configureStore';
import userManager from './state/userManager';

const Root = ({ children, initialState = {} }) => {
  const store = configureStore(initialState);

  return (
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <BrowserRouter>{children}</BrowserRouter>
      </OidcProvider>
    </Provider>
  );
};

Root.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.array,
  ]),
  initialState: PropTypes.object,
};

export default Root;
