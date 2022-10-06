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
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
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
      });
  },
});

export const selectContacts = (state: RootState) => state.contacts.list;
export const selectContactsStatus = (state: RootState) => state.contacts.status;
export const selectContactsError = (state: RootState) => state.contacts.error;

export default contactsSlice.reducer;