import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import './style.less';

import { useWindowSize } from '@/hooks';

import PrivateLayoutUserDropdownMenu from '../UserDropdownMenu';
import userManager from '@/state/userManager';

const PrivateLayoutHeader = ({
  collapsed,
  onCollapse,
  setLogoutRedirecting,
}) => {
  const { isMobile } = useWindowSize();

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'logout':
        setLogoutRedirecting(true);
        userManager.signoutRedirect();
        break;
      default:
        break;
    }
  };

  return (
    <div className="header">
      {isMobile && [
        <Link to="/home" className="header-logo" key="logo">
          <span className="image" />
        </Link>,
      ]}
      {/* eslint-disable-next-line */}
      <span className="collapse-button" onClick={() => onCollapse(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
      <div className="right">
        <Dropdown
          trigger={['click']}
          overlay={
            <PrivateLayoutUserDropdownMenu onMenuClick={handleMenuClick} />
          }
        >
          <span className="action account">
            <Avatar size="small" className="avatar" icon={<UserOutlined />} />
            <span className="name">User</span>
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

PrivateLayoutHeader.propTypes = {
  history: PropTypes.object.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

export default withRouter(PrivateLayoutHeader);
