import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../helpers/api';

export interface UserItem {
  name: string;
  avatar: string;
  email: string;
  username: string;
  id: string;
}

export const fetchUsers = createAsyncThunk<
  UserItem,
  string,
  { rejectValue: string }
>(
  'user/fetchUsers',
  async (userNameFromInput: UserItem['username'], { rejectWithValue }) => {
    const response = await fetch(API.USERS_URL);

    if (!response.ok) {
      return rejectWithValue(
        `Что-то пошло не так: ${response.status} (${response.statusText})`
      );
    }
    const usersList = (await response.json()) as UserItem[];
    const foundUser = usersList.find(
      ({ username }) => username === userNameFromInput
    );

    if (!foundUser) {
      return rejectWithValue('Данный пользователь не существует');
    }

    return foundUser;
  }
);
