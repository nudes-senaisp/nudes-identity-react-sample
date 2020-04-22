import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { Form, Input, Button, notification } from 'antd';

import { authOperations, authSelectors } from '@/state/ducks/auth';

const LoginForm = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(authSelectors.selectLoginLoading());
  const loginData = useSelector(authSelectors.selectLoginData());
  const loginError = useSelector(authSelectors.selectLoginError());

  useEffect(() => {
    if (loginError)
      notification.error({
        message: 'Error during login process',
        description: 'Invalid email or password.',
      });
  }, [loginError]);

  const onFinish = async (values) => {
    await dispatch(authOperations.handleLogin(values));

    if (!isEmpty(loginData)) console.log('sucesso');
  };

  return (
    <Form name="login-form" layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="email"
        label="E-Mail"
        rules={[{ required: true, message: 'Please input your Username' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your Password' }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
