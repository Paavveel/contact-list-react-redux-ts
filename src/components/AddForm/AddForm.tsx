import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addContact,
  ContactFormValues,
} from '../../features/contacts/contactsApi';
import { selectContactsStatus } from '../../features/contacts/contactsSlice';
import { ContactForm } from '../ContactForm/ContactForm';
import { AddFormProps } from './AddForm.props';

export const AddForm = ({ isAddFormOpen, closeAddForm }: AddFormProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectContactsStatus);

  const addNewContact = async ({ name, phone }: ContactFormValues) => {
    await dispatch(addContact({ name: name.trim(), phone: phone.trim() }));
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
      <ContactForm onFinish={addNewContact} status={status} />
    </Modal>
  );
};
