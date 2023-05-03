import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from '../store';

import { ISystemMessageObject, Nullable } from '../../types/types';
import { UserState } from '../types';

const initialState: UserState = {
  isAuth: false,
  token: null,
  userId: null,
  userEmail: null,
  systemMessage: { message: 'Hello', severity: 'neutral' },
  authRequestStatus: 'idle',
};

export const mainSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth(state: WritableDraft<UserState>, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload;
    },
    setToken(state: WritableDraft<UserState>, { payload }: PayloadAction<Nullable<string>>) {
      state.token = payload;
    },
    setUserId(state: WritableDraft<UserState>, { payload }: PayloadAction<Nullable<number>>) {
      state.userId = payload;
    },
    setUserEmail(state: WritableDraft<UserState>, { payload }: PayloadAction<Nullable<string>>) {
      state.userEmail = payload;
    },
    setSystemMessage(
      state: WritableDraft<UserState>,
      { payload }: PayloadAction<Nullable<ISystemMessageObject>>
    ) {
      state.systemMessage = payload;
    },
  },
});

export const {
  actions: { setSystemMessage, setIsAuth, setToken, setUserEmail, setUserId },
} = mainSlice;

export const getIsAuth = ({ user: { isAuth } }: RootState) => isAuth;
export const getToken = ({ user: { token } }: RootState) => token;
export const getUserId = ({ user: { userId } }: RootState) => userId;
export const getUserEmail = ({ user: { userEmail } }: RootState) => userEmail;
export const getSystemMessage = ({ user: { systemMessage } }: RootState) => systemMessage;
export const getAuthRequestStatus = ({ user: { authRequestStatus } }: RootState) =>
  authRequestStatus;

export const { reducer } = mainSlice;
