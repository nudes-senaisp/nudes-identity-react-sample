import { createUserManager } from 'redux-oidc';

import { SERVER } from '@/utils/request/constants';

const STS_DOMAIN = SERVER;

const pageUrl = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

const userManagerConfig = {
  authority: STS_DOMAIN,
  client_id: 'revisor_code',
  scope: 'openid profile offline_access api1',

  response_type: 'code',
  redirect_uri: `${pageUrl}/callback`,
  post_logout_redirect_uri: `${pageUrl}`,
  silent_redirect_uri: `${pageUrl}/silent_renew.html`,

  automaticSilentRenew: true,
  loadUserInfo: true,
  filterProtocolClaims: true,
  revokeAccessTokenOnSignout: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
