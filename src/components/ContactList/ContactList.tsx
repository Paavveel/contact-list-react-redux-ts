import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Avatar, Button, List, Modal } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ContactItem,
  deleteContact,
} from '../../features/contacts/contactsApi';
import { selectContactsStatus } from '../../features/contacts/contactsSlice';
import { EditForm } from '../EditForm/EditForm';
import { ContactListProps } from './ContactList.props';
const { confirm } = Modal;

export const ContactList = ({ filteredContacts }: ContactListProps) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  );
  const status = useAppSelector(selectContactsStatus);
  const dispatch = useAppDispatch();

  const openEditForm = () => setIsEditFormOpen(true);
  const closeEditForm = () => setIsEditFormOpen(false);

  const handleDelete = (contact: ContactItem) => {
    setSelectedContact(contact);
    confirm({
      title: 'Вы уверены?',
      icon: <ExclamationCircleOutlined />,
      content: `Контакт ${contact.name} будет удален`,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        dispatch(deleteContact(contact.id));
      },
    });
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
        dataSource={filteredContacts}
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
                onClick={() => handleDelete(contact)}
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
