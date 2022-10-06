import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  addContact,
  ContactItem,
  deleteContact,
  fetchContacts,
} from './contactsApi';

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
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'success';
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      })

      .addCase(deleteContact.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.list = state.list.filter(
          contact => contact.id !== action.payload
        );
        state.status = 'success';
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      })

      .addCase(addContact.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.list = [...state.list, action.payload];
        state.status = 'success';
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const selectContacts = (state: RootState) => state.contacts.list;
export const selectContactsStatus = (state: RootState) => state.contacts.status;
export const selectContactsError = (state: RootState) => state.contacts.error;

export default contactsSlice.reducer;
