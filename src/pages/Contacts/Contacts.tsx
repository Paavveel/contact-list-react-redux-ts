import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Divider, List } from 'antd';
import Search from 'antd/lib/input/Search';
import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchContacts } from '../../features/contacts/contactsApi';
import {
  selectContacts,
  selectContactsError,
} from '../../features/contacts/contactsSlice';
import styles from './Contacts.module.css';

export const Contacts = () => {
  const contacts = useAppSelector(selectContacts);
  const error = useAppSelector(selectContactsError);
  const dispatch = useAppDispatch();

  const handleLiveSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(
      '🚀 ~ file: Contacts.tsx ~ line 21 ~ handleLiveSearch ~ e.target.value',
      e.target.value
    );
  };
  const handleSearchByButton = (value: string) => {
    console.log(
      '🚀 ~ file: Contacts.tsx ~ line 22 ~ handleSearchByButton ~ value',
      value
    );
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.contactsContainer}>
      <Search
        placeholder='Поиск...'
        enterButton
        allowClear
        onSearch={handleSearchByButton}
        onChange={handleLiveSearch}
      />

      <Divider orientation='center'>Список контактов</Divider>
      <Button type='primary'>Добавить контакт</Button>
      <Divider orientation='center' />
      <List
        itemLayout='horizontal'
        dataSource={contacts}
        renderItem={({ avatar, name, phone }) => (
          <List.Item
            actions={[
              <Button key='list-loadmore-edit' icon={<EditOutlined />} />,
              <Button
                key='list-loadmore-more'
                danger
                icon={<DeleteOutlined />}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={avatar} />}
              title={name}
              description={phone}
            />
          </List.Item>
        )}
      />
      {error && (
        <Alert
          className={styles.loginError}
          message={error}
          type='error'
          showIcon
        />
      )}
    </div>
  );
};
