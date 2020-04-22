import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const PageSection = ({ className, ...rest }) => (
  <div className={`page-section ${className}`} {...rest} />
);

PageSection.propTypes = {
  className: PropTypes.string,
};

export default PageSection;
