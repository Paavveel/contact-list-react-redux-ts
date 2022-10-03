import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import './Login.css';
const { Title } = Typography;

type LoginValues = {
  userName: string;
};

export const Login = () => {
  const onFinish = async ({ userName }: LoginValues) => {
    console.log('Received values of form: ', userName);
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{ userName: '', password: '' }}
      onFinish={onFinish}
    >
      <Title>Авторизация</Title>
      <Form.Item
        name='userName'
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
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Пароль'
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Вход
        </Button>
      </Form.Item>
    </Form>
  );
};
