import Search from 'antd/lib/input/Search';
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
  const handleSearchByButton = (value: string) => {};

  return (
    <Search
      placeholder='Поиск...'
      enterButton
      allowClear
      onSearch={handleSearchByButton}
      onChange={handleLiveSearch}
    />
  );
};
