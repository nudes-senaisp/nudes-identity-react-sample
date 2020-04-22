import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const PrivateLayoutUserDropdownMenu = ({ onMenuClick }) => (
  <Menu onClick={onMenuClick}>
    <Menu.Item key="logout">
      <LogoutOutlined />
      Logout
    </Menu.Item>
  </Menu>
);

PrivateLayoutUserDropdownMenu.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default PrivateLayoutUserDropdownMenu;
