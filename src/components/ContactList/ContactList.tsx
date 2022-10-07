import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ContactItem,
  deleteContact,
} from '../../features/contacts/contactsApi';
import {
  selectContacts,
  selectContactsStatus,
} from '../../features/contacts/contactsSlice';
import { EditForm } from '../EditForm/EditForm';

export const ContactList = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  );
  const contacts = useAppSelector(selectContacts);
  const status = useAppSelector(selectContactsStatus);
  const dispatch = useAppDispatch();

  const openEditForm = () => setIsEditFormOpen(true);
  const closeEditForm = () => setIsEditFormOpen(false);

  const handleDelete = (id: ContactItem['id']) => {
    dispatch(deleteContact(id));
  };
  const handleEdit = (contact: ContactItem) => {
    setSelectedContact(contact);
    openEditForm();
  };

  return (
    <>
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
