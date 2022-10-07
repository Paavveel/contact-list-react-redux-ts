import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NewContactItem } from '../../features/contacts/contactsApi';
import { selectContactsStatus } from '../../features/contacts/contactsSlice';
import { ContactForm } from '../ContactForm/ContactForm';
import { EditFormProps } from './EditForm.props';

export const EditForm = ({
  selectedContact,
  isEditFormOpen,
  closeEditForm,
}: EditFormProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectContactsStatus);

  const editContact = async (contact: NewContactItem) => {};

  return (
    <Modal
      title='Редактирование контакта'
      open={isEditFormOpen}
      onCancel={closeEditForm}
      width={400}
      centered
      footer={null}
    >
      <ContactForm
        initialValues={{
          name: selectedContact?.name,
          phone: selectedContact?.phone,
        }}
        onFinish={editContact}
        status={status}
      />
    </Modal>
  );
};
