import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: state => {
      state.isLoggedIn = true;
    },
    logOut: state => {
      state.isLoggedIn = false;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
