import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Divider, List } from 'antd';
import Search from 'antd/lib/input/Search';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AddForm } from '../../components';
import { EditForm } from '../../components/EditForm/EditForm';
import {
  ContactItem,
  deleteContact,
  fetchContacts,
} from '../../features/contacts/contactsApi';
import {
  selectContacts,
  selectContactsError,
  selectContactsStatus,
} from '../../features/contacts/contactsSlice';
import styles from './Contacts.module.css';

export const Contacts = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  );
  const contacts = useAppSelector(selectContacts);
  const error = useAppSelector(selectContactsError);
  const status = useAppSelector(selectContactsStatus);
  const dispatch = useAppDispatch();

  const openAddForm = () => setIsAddFormOpen(true);
  const closeAddForm = () => setIsAddFormOpen(false);
  const openEditForm = () => setIsEditFormOpen(true);
  const closeEditForm = () => setIsEditFormOpen(false);

  const handleLiveSearch = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleSearchByButton = (value: string) => {};

  const handleDelete = (id: ContactItem['id']) => {
    dispatch(deleteContact(id));
  };
  const handleEdit = (contact: ContactItem) => {
    openEditForm();
    setSelectedContact(contact);
  };

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
        <List
          loading={status === 'loading'}
          itemLayout='horizontal'
          dataSource={contacts}
          renderItem={contact => (
            <List.Item
              actions={[
                <Button
                  key='list-loadmore-edit'
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(contact)}
                />,
                <Button
                  key='list-loadmore-more'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(contact.id)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={contact.avatar} />}
                title={contact.name}
                description={contact.phone}
              />
            </List.Item>
          )}
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
      {isEditFormOpen && (
        <EditForm
          selectedContact={selectedContact}
          isEditFormOpen={isEditFormOpen}
          closeEditForm={closeEditForm}
        />
      )}
    </>
  );
};
