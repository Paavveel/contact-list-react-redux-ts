import { Input } from 'antd';
import { SearchFormProps } from './SearchForm.props';

export const SearchForm = ({ handleLiveSearch }: SearchFormProps) => {
  return (
    <Input
      placeholder='Поиск контакта'
      size='large'
      allowClear
      onChange={handleLiveSearch}
    />
  );
};
