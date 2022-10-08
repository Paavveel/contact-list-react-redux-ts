import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../helpers/api';
import { logIn } from '../auth/authSlice';

export interface User {
  name: string;
  avatar: string;
  email: string;
  username: string;
  id: string;
}
export interface AuthFormValues {
  username: User['username'];
}

export const fetchUsers = createAsyncThunk<
  User,
  AuthFormValues,
  { rejectValue: string }
>(
  'user/fetchUsers',
  async (formValues: AuthFormValues, { rejectWithValue, dispatch }) => {
    const response = await fetch(API.USERS_URL);

    if (!response.ok) {
      return rejectWithValue(
        `Что-то пошло не так: ${response.status} (${response.statusText})`
      );
    }
    const usersList = (await response.json()) as User[];
    const foundUser = usersList.find(
      ({ username }) => username === formValues.username
    );

    if (!foundUser) {
      return rejectWithValue('Данный пользователь не существует');
    }

    dispatch(logIn());
    return foundUser;
  }
);
