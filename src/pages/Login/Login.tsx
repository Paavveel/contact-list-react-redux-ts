import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Spin, Typography } from 'antd';
import { useState } from 'react';
import { API } from '../../helpers/api';
import styles from './Login.module.css';
const { Title } = Typography;

type LoginValues = {
  userName: string;
};

type UserItem = {
  name: string;
  avatar: string;
  email: string;
  username: string;
  id: string;
};

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async ({ userName }: LoginValues) => {
    setLoading(true);
    setError('');
    const response = await fetch(API.USERS_URL);
    const usersList: UserItem[] = await response.json();

    const foundUser = usersList.find(user => user.username === userName);

    if (!foundUser) {
      setError('Такого пользователя не существует');
    }
    setLoading(false);
  };

  return (
    <div className={styles.loginFormContainer}>
      <Spin spinning={loading}>
        <Form
          name='normal_login'
          className={styles.loginForm}
          initialValues={{ userName: '', password: '' }}
          onFinish={onFinish}
        >
          <Title className={styles.loginFormTitle}>Авторизация</Title>
          <Form.Item
            name='userName'
            rules={[
              { required: true, message: 'Пожалуйста введите ваш логин' },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Логин'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Пожалуйста введите ваш пароль' },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Пароль'
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className={styles.loginFormButton}
            >
              Вход
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      {error && (
        <Alert
          className={styles.loginError}
          message={error}
          type='error'
          showIcon
        />
      )}
    </div>
  );
};
