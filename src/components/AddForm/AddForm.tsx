import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectContactsError,
  selectContactsStatus,
} from '../../features/contacts/contactsSlice';
import styles from './AddForm.module.css';
import { AddFormProps, AddFormValues } from './AddForm.props';

export const AddForm = ({ isAddFormOpen, closeAddForm }: AddFormProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectContactsStatus);
  const error = useAppSelector(selectContactsError);

  const onFinish = ({ name, phone }: AddFormValues) => {};

  return (
    <Modal
      title='Редактирование контакта'
      confirmLoading={status === 'success'}
      open={isAddFormOpen}
      onCancel={closeAddForm}
      width={400}
      centered
      footer={null}
    >
      <Form
        initialValues={{
          name: '',
          phone: '',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          rules={[
            { required: true, message: 'Пожалуйста введите имя контакта' },
          ]}
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
            className={styles.addButton}
            type='primary'
            htmlType='submit'
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
      {error && (
        <Alert className={styles.addError} message={error} type='error' />
      )}
    </Modal>
  );
};
