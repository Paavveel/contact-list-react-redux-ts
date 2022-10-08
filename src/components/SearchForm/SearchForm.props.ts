import { ChangeEvent } from 'react';
export interface SearchFormProps {
  handleLiveSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}
