import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addContact,
  NewContactItem,
} from '../../features/contacts/contactsApi';
import { selectContactsStatus } from '../../features/contacts/contactsSlice';
import { ContactForm } from '../ContactForm/ContactForm';
import { AddFormProps } from './AddForm.props';

export const AddForm = ({ isAddFormOpen, closeAddForm }: AddFormProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectContactsStatus);

  const onFinish = async (newContact: NewContactItem) => {
    await dispatch(addContact(newContact));
    closeAddForm();
  };

  return (
    <Modal
      title='Добавление контакта'
      open={isAddFormOpen}
      onCancel={closeAddForm}
      width={400}
      centered
      footer={null}
    >
      <ContactForm onFinish={onFinish} status={status} />
    </Modal>
  );
};
