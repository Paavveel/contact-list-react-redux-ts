import { Input } from 'antd';
import { ChangeEvent } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectContacts } from '../../features/contacts/contactsSlice';
import { SearchFormProps } from './SearchForm.props';

export const SearchForm = ({ setFilteredContacts }: SearchFormProps) => {
  const contacts = useAppSelector(selectContacts);

  const handleLiveSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredContacts = contacts.filter(
      c =>
        c.name.toLowerCase().includes(searchValue) ||
        c.phone.toLowerCase().includes(searchValue)
    );
    setFilteredContacts(filteredContacts);
  };

  return (
    <Input
      placeholder='Поиск контакта'
      size='large'
      allowClear
      onChange={handleLiveSearch}
    />
  );
};
