import {
  ContactItem,
  NewContactItem,
} from '../../features/contacts/contactsApi';
import { ContactsState } from '../../features/contacts/contactsSlice';

type ContactInitialValues = {
  name: ContactItem['name'] | undefined;
  phone: ContactItem['phone'] | undefined;
};

export interface ContactFormProps {
  initialValues?: ContactInitialValues;
  onFinish: (newContact: NewContactItem) => void;
  status: ContactsState['status'];
}
