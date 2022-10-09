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

export const AuthForm = ({
  onFinish,
  buttonText,
  confirmPassword = false,
}: AuthFormProps) => {
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
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ваш логин',
              whitespace: true,
            },
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
            {
              required: true,
              message: 'Пожалуйста введите ваш пароль',
              whitespace: true,
            },
          ]}
          hasFeedback={confirmPassword ? true : false}
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
        {confirmPassword && (
          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Пожалуйста подтвердите ваш пароль',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              type='password'
              placeholder='Повторите пароль'
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className={styles.AuthFormButton}
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
