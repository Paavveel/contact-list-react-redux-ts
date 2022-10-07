import Search from 'antd/lib/input/Search';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectContactsStatus } from '../../features/contacts/contactsSlice';
import { SearchFormProps } from './SearchForm.props';

export const SearchForm = ({}: SearchFormProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectContactsStatus);

  const handleLiveSearch = (e: ChangeEvent<HTMLInputElement>) => {};
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
