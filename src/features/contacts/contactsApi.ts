import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../helpers/api';

export interface ContactItem {
  name: string;
  avatar: string;
  phone: string;
  id: string;
}

export const fetchContacts = createAsyncThunk<
  ContactItem[],
  string,
  { rejectValue: string }
>('contacts/fetchContacts', async (_, { rejectWithValue }) => {
  const response = await fetch(API.CONTACTS_URL);

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при получении контактов: ${response.status} (${response.statusText})`
    );
  }
  return await response.json();
});
