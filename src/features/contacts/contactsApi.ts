import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../helpers/api';

export interface ContactItem {
  name: string;
  avatar: string;
  phone: string;
  id: string;
}

export interface ContactFormValues {
  name: ContactItem['name'];
  phone: ContactItem['phone'];
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

export const addContact = createAsyncThunk<
  ContactItem,
  ContactFormValues,
  { rejectValue: string }
>('contacts/addContact', async (newContact, { rejectWithValue }) => {
  const response = await fetch(API.CONTACTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newContact),
  });

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при добавлении: ${response.status} (${response.statusText})`
    );
  }
  return await response.json();
});

export const editContact = createAsyncThunk<
  ContactItem,
  ContactItem,
  { rejectValue: string }
>('contacts/editContact', async (editedContact, { rejectWithValue }) => {
  const response = await fetch(`${API.CONTACTS_URL}/${editedContact.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedContact),
  });

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при редактировании: ${response.status} (${response.statusText})`
    );
  }
  return await response.json();
});
