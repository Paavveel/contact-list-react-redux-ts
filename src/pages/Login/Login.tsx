import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Form, Input, Spin, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logIn } from '../../features/auth/authSlice';
import { fetchUsers, UserItem } from '../../features/user/userApi';
import {
  selectUserError,
  selectUserStatus,
} from '../../features/user/userSlice';
import styles from './Login.module.css';
const { Title } = Typography;

export const Login = () => {
  const status = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectUserError);

  const dispatch = useAppDispatch();

  const onFinish = async ({ username }: { username: UserItem['username'] }) => {
    const isUserFound = await dispatch(fetchUsers(username)).unwrap();

    if (isUserFound) {
      dispatch(logIn());
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <Spin spinning={status === 'loading'}>
        <Form
          name='normal_login'
          className={styles.loginForm}
          initialValues={{ username: '', password: '' }}
          onFinish={onFinish}
        >
          <Title className={styles.loginFormTitle}>Авторизация</Title>
          <Form.Item
            name='username'
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
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
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
          closable
        />
      )}
    </div>
  );
};
