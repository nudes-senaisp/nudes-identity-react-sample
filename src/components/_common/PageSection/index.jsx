import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

import './style.less';

const PageSection = ({ className, loading, children, actions, ...rest }) => (
  <div className={`page-section${className ? ` ${className}` : ''}`} {...rest}>
    {actions ? <div className="section-actions">{actions}</div> : null}
    <Skeleton active loading={loading}>
      {children}
    </Skeleton>
  </div>
);

PageSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
  ]),
  actions: PropTypes.array,

  className: PropTypes.string,
  loading: PropTypes.bool,
};

PageSection.defaultProps = {
  loading: false,
};

export default PageSection;
