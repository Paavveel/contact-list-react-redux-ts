import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../helpers/api';
import { logIn } from '../auth/authSlice';

export interface User {
  username: string;
  password: string;
  avatar: string;
  id: string;
}
export interface AuthFormValues {
  username: User['username'];
  password: User['password'];
  confirm?: string;
}

export const getAuth = createAsyncThunk<
  User,
  AuthFormValues,
  { rejectValue: string }
>(
  'user/getAuth',
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

export const createUser = createAsyncThunk<
  User,
  AuthFormValues,
  { rejectValue: string }
>(
  'user/createUser',
  async ({ username, password }: AuthFormValues, { rejectWithValue }) => {
    const getAllUsers = await fetch(API.USERS_URL);

    if (!getAllUsers.ok) {
      return rejectWithValue(
        `Что-то пошло не так: ${getAllUsers.status} (${getAllUsers.statusText})`
      );
    }

    const allUsersList = (await getAllUsers.json()) as User[];

    const foundUser = allUsersList.find(
      ({ username: uname }) => uname === username
    );

    if (foundUser) {
      return rejectWithValue('Данный пользователь уже существует');
    }

    const response = await fetch(API.USERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      return rejectWithValue(
        `Что-то пошло не так: ${response.status} (${response.statusText})`
      );
    }

    return await response.json();
  }
);
