import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createUser, getAuth, User } from './userApi';

export interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'failed' | 'success';
  error: string;
}

const getInitialUserFromLocalStorage = (): UserState['user'] => {
  const user = localStorage.getItem('user');
  if (typeof user === 'string') {
    return JSON.parse(user);
  }
  return null;
};

const initialState: UserState = {
  user: getInitialUserFromLocalStorage(),
  status: 'idle',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: state => {
      state.error = '';
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getAuth.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'success';
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      })
      .addCase(getAuth.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      })

      .addCase(createUser.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'success';
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
