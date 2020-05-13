import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';

import { getSelectedMenuKeys, getRoutesByGroup } from '@/utils/route';
import { useWindowSize } from '@/hooks';
import routes from '@/routes';

import userManager from '@/state/userManager';

import './style.less';

const { Header, Content, Footer } = Layout;

const Logo = (props) => <div {...props} />;

const PublicLayout = (props) => {
  const { isMobile } = useWindowSize();
  const { user, isLoadingUser } = useSelector(({ oidc }) => oidc);

  const {
    path,
    children,
    location: { pathname },
  } = props;

  const menuRoutes = getRoutesByGroup(routes, 'public');
  menuRoutes.push({
    key: 'login',
  });

  const menuKeys = menuRoutes.map((route) => route.path);

  const selectedMenuKeys = getSelectedMenuKeys(menuKeys, pathname);

  const handleLoginClick = () => {
    userManager.signinRedirect();
  };

  const menuItems = menuRoutes.map((route) => {
    const className = route.key === 'login' && !isMobile ? 'menu-login' : '';
    const link = route.key === 'home' ? '/' : route.path;
    const logged = user !== null && !isLoadingUser;

    if (route.key === 'login') {
      return logged ? (
        <Menu.Item key="/app/profile" className={className}>
          <Link to="/app/profile">Dashboard</Link>
        </Menu.Item>
      ) : (
        <Menu.Item key="login" className={className} onClick={handleLoginClick}>
          Login
        </Menu.Item>
      );
    }

    return (
      <Menu.Item key={route.path} className={className}>
        <Link to={link}>{route.name}</Link>
      </Menu.Item>
    );
  });

  return (
    <Route
      path={path}
      render={() => (
        <Layout className="page-layout">
          <Header className="page-header">
            <Logo className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              className="menu"
              defaultSelectedKeys={
                selectedMenuKeys.length ? selectedMenuKeys : ['/home']
              }
            >
              {isMobile ? (
                <Menu.SubMenu
                  className="mobile-submenu"
                  title={<Icon className="icon" type="menu" />}
                >
                  {menuItems}
                </Menu.SubMenu>
              ) : (
                menuItems
              )}
            </Menu>
          </Header>
          <Content className="page-content">{children}</Content>
          <Footer className="page-footer">ISTIC ©2020</Footer>
        </Layout>
      )}
    />
  );
};

PublicLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  path: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  location: PropTypes.object,
};

export default PublicLayout;
