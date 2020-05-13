import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PageHeader } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { getRouteBreadcrumb } from '@/utils/route';

import './style.less';

const PrivatePageHeader = ({ route, loading, breadcrumbIds, ...rest }) => {
  const breadcrumb = getRouteBreadcrumb(route);

  const getBreadcrumbNameFromIds = (id) => {
    const key = id.slice(1);

    return breadcrumbIds[key];
  };

  const itemRender = (item, _, routes) => {
    const last = routes.indexOf(item) === routes.length - 1;

    const isParam = item.breadcrumbName.indexOf(':') === 0;

    const breadcrumbName = isParam
      ? getBreadcrumbNameFromIds(item.breadcrumbName)
      : item.breadcrumbName;

    return last ? (
      <span>{loading && isParam ? <LoadingOutlined /> : breadcrumbName}</span>
    ) : (
      <Link to={item.path}>
        {loading && isParam ? <LoadingOutlined /> : breadcrumbName}
      </Link>
    );
  };

  return (
    <PageHeader
      className="private-page-header"
      breadcrumb={{ routes: breadcrumb, itemRender }}
      {...rest}
    />
  );
};

PrivatePageHeader.propTypes = {
  route: PropTypes.object.isRequired,

  loading: PropTypes.bool,
  breadcrumbIds: PropTypes.object,
};

export default PrivatePageHeader;
