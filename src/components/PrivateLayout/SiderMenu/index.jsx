import React from 'react';
import PropTypes from 'prop-types';
import DrawerMenu from 'rc-drawer';

import { useWindowSize } from '@/hooks';

import PrivateLayoutMenu from '../Menu';

import 'rc-drawer/assets/index.css';

const PrivateLayoutSiderMenu = (props) => {
  const { isMobile } = useWindowSize();

  const { collapsed, onCollapse } = props;

  return isMobile ? (
    <DrawerMenu
      getContainer={null}
      level={null}
      open={!collapsed}
      onHandleClick={() => {
        onCollapse(!collapsed);
      }}
      onClose={() => {
        onCollapse(!collapsed);
      }}
      handler={false}
    >
      <PrivateLayoutMenu {...props} collapsed={isMobile ? false : collapsed} />
    </DrawerMenu>
  ) : (
    <PrivateLayoutMenu {...props} />
  );
};

PrivateLayoutSiderMenu.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

export default PrivateLayoutSiderMenu;
