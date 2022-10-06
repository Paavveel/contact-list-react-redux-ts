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
  void,
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

export const deleteContact = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('contacts/deleteContact', async (id, { rejectWithValue }) => {
  const response = await fetch(`${API.CONTACTS_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при удалении: ${response.status} (${response.statusText})`
    );
  }
  return id;
});
