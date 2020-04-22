import React from 'react';
import { Row, Col, Button } from 'antd';

import userManager from '@/state/userManager';

import PageSection from '@/components/_common/PageSection';

import './style.less';

const Login = () => {
  const handleLogin = () => {
    userManager.signinRedirect();
  };
  
  return (
    <Row type="flex" justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={8} xxl={6}>
        <PageSection>
          <Button block type="primary" onClick={handleLogin}>
            Login
          </Button>
        </PageSection>
      </Col>
    </Row>
  );
};

export default Login;
