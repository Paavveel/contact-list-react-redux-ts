import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, List } from 'antd';
import { useEffect, useState } from 'react';
import { API } from '../../helpers/api';
import styles from './Contacts.module.css';

type ContactItem = {
  name: string;
  avatar: string;
  phone: string;
  id: string;
};

export const Contacts = () => {
  const [contactList, setContactList] = useState<ContactItem[]>([]);

  useEffect(() => {
    fetch(API.CONTACTS_URL)
      .then(res => res.json())
      .then(data => setContactList(data));
  }, []);

  return (
    <div className={styles.contactsContainer}>
      <Button type='primary'>Добавить контакт</Button>
      <Divider orientation='center'>Список контактов</Divider>
      <List
        itemLayout='horizontal'
        dataSource={contactList}
        renderItem={item => (
          <List.Item
            actions={[
              <Button key='list-loadmore-edit' icon={<EditOutlined />}>
                edit
              </Button>,
              <Button key='list-loadmore-more' icon={<DeleteOutlined />}>
                delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.name}
              description={item.phone}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
