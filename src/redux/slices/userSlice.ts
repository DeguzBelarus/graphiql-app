import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from '../store';

import { ISystemMessageObject, Nullable } from '../../types/types';
import { UserState } from '../types';
import { loginUserAsync, registerUserAsync } from '../thunks';

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
    setUserId(state: WritableDraft<UserState>, { payload }: PayloadAction<Nullable<string>>) {
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
  extraReducers: (builder) => {
    builder

      // register a new user
      .addCase(registerUserAsync.pending, (state) => {
        state.authRequestStatus = 'loading';
      })
      .addCase(registerUserAsync.fulfilled, (state, { payload }) => {
        state.authRequestStatus = 'idle';

        if (payload) {
          if (payload.token && payload.userEmail && payload.userId) {
            state.token = payload.token;
            state.userEmail = payload.userEmail;
            state.userId = payload.userId;
          }
          state.isAuth = true;
        }
      })
      .addCase(registerUserAsync.rejected, (state, { error }) => {
        state.authRequestStatus = 'failed';
        if (error.message) {
          const formattedError = error.message
            .split('(')[1]
            .slice(0, error.message.split('(')[1].length - 2)
            .replace('auth/', '')
            .replaceAll('-', ' ');
          state.systemMessage = { message: formattedError, severity: 'negative' };
        }
        console.error('\x1b[40m\x1b[31m\x1b[1m', error.message);
      })

      // login user
      .addCase(loginUserAsync.pending, (state) => {
        state.authRequestStatus = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, { payload }) => {
        state.authRequestStatus = 'idle';

        if (payload) {
          if (payload.token && payload.userEmail && payload.userId) {
            state.token = payload.token;
            state.userEmail = payload.userEmail;
            state.userId = payload.userId;
          }
          state.isAuth = true;
        }
      })
      .addCase(loginUserAsync.rejected, (state, { error }) => {
        state.authRequestStatus = 'failed';
        if (error.message) {
          const formattedError = error.message
            .split('(')[1]
            .slice(0, error.message.split('(')[1].length - 2)
            .replace('auth/', '')
            .replaceAll('-', ' ');
          state.systemMessage = { message: formattedError, severity: 'negative' };
        }
        console.error('\x1b[40m\x1b[31m\x1b[1m', error.message);
      });
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
