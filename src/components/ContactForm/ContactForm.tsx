import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import styles from './ContactForm.module.css';
import { ContactFormProps } from './ContactForm.props';

export const ContactForm = ({
  onFinish,
  status,
  initialValues,
}: ContactFormProps) => {
  return (
    <Form
      onFinish={onFinish}
      disabled={status === 'loading'}
      initialValues={initialValues}
    >
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Пожалуйста введите имя контакта' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Имя контакта'
        />
      </Form.Item>

      <Form.Item
        name='phone'
        rules={[
          { required: true, message: 'Пожалуйста введите номер телефона' },
        ]}
      >
        <Input
          prefix={<PhoneOutlined className='site-form-item-icon' />}
          placeholder='Номер телефона'
        />
      </Form.Item>

      <Form.Item>
        <Button
          loading={status === 'loading'}
          className={styles.ContactFormButton}
          type='primary'
          htmlType='submit'
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};
