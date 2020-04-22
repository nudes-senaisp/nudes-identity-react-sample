import React from 'react';
import { CallbackComponent } from 'redux-oidc';

import userManager from '../../state/userManager';

const LoginCallbackPage = ({ history }) => {
  const onLoginSuccess = (user) => {
    history.push('/app/profile');
  };

  const onLoginError = (err) => {
    console.log('Falha ao Logar');
    console.log(err);
  };

  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={onLoginSuccess}
      errorCallback={onLoginError}
    >
      <div>Redirecting...</div>
    </CallbackComponent>
  );
};

export default LoginCallbackPage;
