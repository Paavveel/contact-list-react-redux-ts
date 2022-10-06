import { ContactItem } from '../../features/contacts/contactsApi';

export interface AddFormProps {
  isAddFormOpen: boolean;
  closeAddForm: () => void;
}

export type AddFormValues = {
  name: ContactItem['name'];
  phone: ContactItem['phone'];
};
