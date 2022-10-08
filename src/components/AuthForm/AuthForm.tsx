import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectUserStatus } from '../../features/user/userSlice';
import styles from './AuthForm.module.css';
import { AuthFormProps } from './AuthForm.props';

export const AuthForm = ({ onFinish }: AuthFormProps) => {
  const status = useAppSelector(selectUserStatus);

  return (
    <Spin spinning={status === 'loading'}>
      <Form
        name='normal_login'
        className={styles.AuthForm}
        initialValues={{ username: '', password: '' }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Пожалуйста введите ваш логин' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Логин'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Пожалуйста введите ваш пароль' }]}
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
            className={styles.AuthFormButton}
          >
            Вход
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
