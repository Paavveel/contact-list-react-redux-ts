import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NewContactItem } from '../../features/contacts/contactsApi';
import { selectContactsStatus } from '../../features/contacts/contactsSlice';
import styles from './EditForm.module.css';
import { EditFormProps } from './EditForm.props';

export const EditForm = ({
  selectedContact,
  isEditFormOpen,
  closeEditForm,
}: EditFormProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectContactsStatus);

  const onFinish = async (newContact: NewContactItem) => {};

  return (
    <Modal
      title='Редактирование контакта'
      open={isEditFormOpen}
      onCancel={closeEditForm}
      width={400}
      centered
      footer={null}
    >
      <Form
        initialValues={{
          name: selectedContact?.name,
          phone: selectedContact?.phone,
        }}
        onFinish={onFinish}
        disabled={status === 'loading'}
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
    </Modal>
  );
};
