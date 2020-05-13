import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { useWindowSize } from '@/hooks';

import userManager from '@/state/userManager';

import PrivateLayoutUserDropdownMenu from '../UserDropdownMenu';

import './style.less';

const PrivateLayoutHeader = ({
  collapsed,
  onCollapse,
  setLogoutRedirecting,
}) => {
  const { isMobile } = useWindowSize();

  const profile = useSelector((state) => state.oidc?.user?.profile);

  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  const handleVisibleChange = (flag) => {
    setDropdownVisible(flag);
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
          visible={dropdownVisible}
          onVisibleChange={handleVisibleChange}
          overlay={
            <PrivateLayoutUserDropdownMenu onMenuClick={handleMenuClick} />
          }
        >
          <span className="action account">
            <Avatar size="small" className="avatar" icon={<UserOutlined />} />
            <span className="name">{profile && profile.name}</span>
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

PrivateLayoutHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,

  setLogoutRedirecting: PropTypes.func.isRequired,
};

export default withRouter(PrivateLayoutHeader);
