import { Alert, Button, Divider } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AddForm, ContactList, SearchForm } from '../../components';
import {
  ContactItem,
  fetchContacts,
} from '../../features/contacts/contactsApi';
import {
  selectContacts,
  selectContactsError,
} from '../../features/contacts/contactsSlice';
import styles from './Contacts.module.css';

export const Contacts = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredContacts, setFilteredContacts] = useState<ContactItem[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const contacts = useAppSelector(selectContacts);
  const error = useAppSelector(selectContactsError);
  const dispatch = useAppDispatch();

  const openAddForm = () => setIsAddFormOpen(true);
  const closeAddForm = () => setIsAddFormOpen(false);

  const handleLiveSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    const filteredContactsArray = contacts.filter(
      c =>
        c.name.toLowerCase().includes(searchValue) ||
        c.phone.toLowerCase().includes(searchValue)
    );
    setFilteredContacts(filteredContactsArray);
  }, [searchValue, contacts]);

  return (
    <>
      <div className={styles.contactsContainer}>
        <SearchForm handleLiveSearch={handleLiveSearch} />
        <Divider orientation='center'>Список контактов</Divider>
        <Button type='primary' onClick={openAddForm}>
          Добавить контакт
        </Button>
        <Divider orientation='center' />
        <ContactList
          filteredContacts={
            searchValue && filteredContacts.length >= 0
              ? filteredContacts
              : contacts
          }
        />
        {error && (
          <Alert
            className={styles.contactsError}
            message={error}
            type='error'
            showIcon
            closable
          />
        )}
      </div>
      {isAddFormOpen && (
        <AddForm isAddFormOpen={isAddFormOpen} closeAddForm={closeAddForm} />
      )}
    </>
  );
};
