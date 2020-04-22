import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

import Root from './Root';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import { getRoute, getRoutesByGroup } from './utils/route';

const App = () => {
  const app = getRoute(routes, 'app');
  const publicRoutes = getRoutesByGroup(routes, 'public');

  const loginCallback = getRoute(routes, 'callback');

  return (
    <Root>
      <Switch>
        <PrivateLayout path="/app" routes={app.routes}>
          {app.routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </PrivateLayout>
        <Route {...loginCallback} />
        <PublicLayout path="/">
          {publicRoutes.map((route) => (
            <Route {...route} path={route.key === 'home' ? '/' : route.path} />
          ))}
        </PublicLayout>
      </Switch>
    </Root>
  );
};

export default App;
