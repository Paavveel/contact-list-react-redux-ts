import { ContactItem } from './../../features/contacts/contactsApi';
export interface SearchFormProps {
  setFilteredContacts: (value: ContactItem[]) => void;
}
