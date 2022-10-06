import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUsers, UserItem } from './userApi';

export interface UserState {
  data: UserItem | null;
  status: 'idle' | 'loading' | 'failed' | 'success';
  error: string;
}

const getInitialUserFromLocalStorage = (): UserState['data'] => {
  const user = localStorage.getItem('user');
  if (typeof user === 'string') {
    return JSON.parse(user);
  }
  return null;
};

const initialState: UserState = {
  data: getInitialUserFromLocalStorage(),
  status: 'idle',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'success';
          state.data = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const selectUser = (state: RootState) => state.user.data;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
