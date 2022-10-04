import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { API } from '../../helpers/api';

export interface UserItem {
  name: string;
  avatar: string;
  email: string;
  username: string;
  id: string;
}

export interface UserState {
  data: UserItem | null;
  status: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: UserState = {
  data: null,
  status: 'idle',
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (userNameFromInput: UserItem['username'], { rejectWithValue }) => {
    try {
      const response = await fetch(API.USERS_URL);
      const usersList = (await response.json()) as UserItem[];
      return usersList.filter(({ username }) => username === userNameFromInput);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload[5];
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectUser = (state: RootState) => state.user.data;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
