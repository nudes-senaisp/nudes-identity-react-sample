import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Layout, Spin } from 'antd';

import { useWindowSize } from '@/hooks';

import PrivateLayoutSiderMenu from '@/components/PrivateLayout/SiderMenu';
import PrivateLayoutHeader from '@/components/PrivateLayout/Header';

import './style.less';

const { Header, Content, Footer } = Layout;

const PrivateLayout = ({ path, children }) => {
  const { isMobile } = useWindowSize();
  const [collapsed, setCollapsed] = useState(isMobile);
  const [logoutRedirecting, setLogoutRedirecting] = useState(false);
  const { user, isLoadingUser } = useSelector(({ oidc }) => oidc);

  const handleMenuCollapse = (c) => setCollapsed(c);

  if ((!user || user.expired) && !isLoadingUser && !logoutRedirecting)
    return <Redirect to="/login" />;

  return (
    <Route
      path={path}
      render={() => (
        <Layout style={{ minHeight: '100vh' }}>
          <PrivateLayoutSiderMenu
            collapsed={collapsed}
            onCollapse={handleMenuCollapse}
          />
          <Layout>
            <Header className="header-wrapper">
              <PrivateLayoutHeader
                collapsed={collapsed}
                onCollapse={handleMenuCollapse}
                logoutRedirecting={logoutRedirecting}
                setLogoutRedirecting={setLogoutRedirecting}
              />
            </Header>
            <Spin spinning={isLoadingUser}>
              <Content className="content-wrapper">{children}</Content>
            </Spin>
            <Footer className="footer-wrapper">ISTIC ©2020</Footer>
          </Layout>
        </Layout>
      )}
    />
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  path: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

export default PrivateLayout;
