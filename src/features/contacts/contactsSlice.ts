import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ContactItem, fetchContacts } from './contactsApi';

export interface ContactsState {
  list: ContactItem[];
  status: 'idle' | 'loading' | 'failed' | 'success';
  error: string;
}

const initialState: ContactsState = {
  list: [],
  status: 'idle',
  error: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {})
      .addCase(fetchContacts.fulfilled, (state, action) => {})
      .addCase(fetchContacts.rejected, (state, action) => {});
  },
});

export const selectContacts = (state: RootState) => state.contacts.list;
export const selectContactsStatus = (state: RootState) => state.contacts.status;
export const selectContactsError = (state: RootState) => state.contacts.error;

export default contactsSlice.reducer;
