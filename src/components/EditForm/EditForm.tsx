import { message, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ContactFormValues,
  editContact,
} from '../../features/contacts/contactsApi';
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

  const editSelectedContact = async ({ name, phone }: ContactFormValues) => {
    if (!selectedContact) return;

    if (
      selectedContact.name === name.trim() &&
      selectedContact.phone === phone.trim()
    ) {
      closeEditForm();
      message.warning('Нет изменений в контакте');
      return;
    }

    await dispatch(
      editContact({
        ...selectedContact,
        ...{ name: name.trim(), phone: phone.trim() },
      })
    );
    closeEditForm();
  };

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
        onFinish={editSelectedContact}
        status={status}
      />
    </Modal>
  );
};
