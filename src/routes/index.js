import React from 'react';

import { UserOutlined } from '@ant-design/icons';

import formatRoutes from '@/utils/route/formatRoutes';

import HomePage from '@/pages/HomePage';
import Login from '@/pages/LoginPage';
import LoginCallbackPage from '@/pages/LoginCallbackPage';
import ProfilePage from '@/pages/ProfilePage';

const routes = [
  {
    key: 'home',
    groupKey: 'public',
    exact: true,
    component: HomePage,
    name: 'Home',
  },
  {
    key: 'login',
    groupKey: 'public',
    component: Login,
    name: 'Login',
  },
  {
    key: 'app',
    routes: [
      {
        key: 'profile',
        component: ProfilePage,
        name: 'Meu Perfil',
        menu: {
          icon: <UserOutlined />,
        },
      },
    ],
  },
  {
    key: 'callback',
    component: LoginCallbackPage,
    name: 'LoginCallback',
  },
];

export default formatRoutes(routes);
