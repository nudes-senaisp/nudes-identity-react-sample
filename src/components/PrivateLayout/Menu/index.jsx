import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import routes from '@/routes';

import { useWindowSize } from '@/hooks';

import { menuFormatter, getSelectedMenuKeys, getRoute } from '@/utils/route';

import './style.less';

const PrivateLayoutMenu = ({ collapsed, onCollapse, location }) => {
  const { isMobile } = useWindowSize();
  const menuArr = getRoute(routes, 'app').routes;
  const menuData = menuFormatter(menuArr);

  const menuKeys = menuArr.map((route) =>
    route.path === '/app' ? '/app/home' : route.path,
  );
  const selectedMenuKeys = getSelectedMenuKeys(menuKeys, location.pathname);

  const renderMenuLink = (item) => {
    const { path, target, name, icon } = item;

    return (
      <Link
        to={path}
        target={target}
        replace={path === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  const renderSubMenuOrItem = (appRoute) => {
    const { name, path, icon } = appRoute;

    if (appRoute.routes && appRoute.routes.some((child) => child.name)) {
      const childrenItems = renderMenuItems(appRoute.routes);

      if (childrenItems) {
        return (
          <Menu.SubMenu
            key={path}
            title={
              icon ? (
                <span>
                  <Icon type={icon} />
                  <span>{name}</span>
                </span>
              ) : (
                name
              )
            }
          >
            {childrenItems}
          </Menu.SubMenu>
        );
      }

      return null;
    }

    return (
      <Menu.Item key={path === '/app' ? '/app/home' : path}>
        {renderMenuLink(appRoute)}
      </Menu.Item>
    );
  };

  const renderMenuItems = (data) => {
    if (!data) return [];

    return data
      .filter((item) => item.name)
      .map((item) => renderSubMenuOrItem(item))
      .filter((item) => item);
  };

  return (
    <Layout.Sider
      theme="dark"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      className="sider"
      width={252}
    >
      <div className="logo">
        <div className="image"></div>
        <h1 className="text">Example</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{ padding: '16px 0', width: '100%' }}
        selectedKeys={
          selectedMenuKeys.length ? selectedMenuKeys : ['/app/home']
        }
      >
        {renderMenuItems(menuData)}
      </Menu>
    </Layout.Sider>
  );
};

PrivateLayoutMenu.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(PrivateLayoutMenu);
