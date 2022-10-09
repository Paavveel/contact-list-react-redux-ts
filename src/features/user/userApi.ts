import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../helpers/api';
import { logIn } from '../auth/authSlice';

export interface User {
  name: string;
  avatar: string;
  email: string;
  username: string;
  password: string;
  id: string;
}
export interface AuthFormValues {
  username: User['username'];
  password: User['password'];
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
    const foundUserByUsername = usersList.find(
      ({ username }) => username === formValues.username
    );

    if (!foundUserByUsername) {
      return rejectWithValue('Данный пользователь не существует');
    }
    const foundUser = usersList.find(
      ({ username, password }) =>
        username === formValues.username && password === formValues.password
    );

    if (!foundUser) {
      return rejectWithValue('Неверный пароль');
    }

    dispatch(logIn());
    return foundUser;
  }
);
