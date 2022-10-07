import { Alert, Button, Divider } from 'antd';
import Search from 'antd/lib/input/Search';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AddForm, ContactList } from '../../components';
import { fetchContacts } from '../../features/contacts/contactsApi';
import { selectContactsError } from '../../features/contacts/contactsSlice';
import styles from './Contacts.module.css';

export const Contacts = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const error = useAppSelector(selectContactsError);
  const dispatch = useAppDispatch();

  const openAddForm = () => setIsAddFormOpen(true);
  const closeAddForm = () => setIsAddFormOpen(false);

  const handleLiveSearch = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleSearchByButton = (value: string) => {};

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div className={styles.contactsContainer}>
        <Search
          placeholder='Поиск...'
          enterButton
          allowClear
          onSearch={handleSearchByButton}
          onChange={handleLiveSearch}
        />
        <Divider orientation='center'>Список контактов</Divider>
        <Button type='primary' onClick={openAddForm}>
          Добавить контакт
        </Button>
        <Divider orientation='center' />
        <ContactList />
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
