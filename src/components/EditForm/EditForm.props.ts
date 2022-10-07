import { ContactItem } from '../../features/contacts/contactsApi';

export interface EditFormProps {
  selectedContact: ContactItem | null;
  isEditFormOpen: boolean;
  closeEditForm: () => void;
}
