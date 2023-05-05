import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from '../store';

import { CurrentLanguageType, ISystemMessageObject, Nullable } from '../../types/types';
import { MainState, RequestStatusType } from '../types';
import { loginUserAsync, registerUserAsync } from '../thunks';

const initialState: MainState = {
  currentLanguage: 'en',
  isFirstLoad: true,
  isAuth: false,
  token: null,
  userId: null,
  userEmail: null,
  systemMessage: null,
  authRequestStatus: 'idle',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCurrentLanguage(
      state: WritableDraft<MainState>,
      { payload }: PayloadAction<CurrentLanguageType>
    ) {
      state.currentLanguage = payload;
    },
    setIsFirstLoad(state: WritableDraft<MainState>, { payload }: PayloadAction<boolean>) {
      state.isFirstLoad = payload;
    },
    setIsAuth(state: WritableDraft<MainState>, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload;
    },
    setToken(state: WritableDraft<MainState>, { payload }: PayloadAction<Nullable<string>>) {
      state.token = payload;
    },
    setUserId(state: WritableDraft<MainState>, { payload }: PayloadAction<Nullable<string>>) {
      state.userId = payload;
    },
    setUserEmail(state: WritableDraft<MainState>, { payload }: PayloadAction<Nullable<string>>) {
      state.userEmail = payload;
    },
    setSystemMessage(
      state: WritableDraft<MainState>,
      { payload }: PayloadAction<Nullable<ISystemMessageObject>>
    ) {
      state.systemMessage = payload;
    },
    setAuthRequestStatus(
      state: WritableDraft<MainState>,
      { payload }: PayloadAction<RequestStatusType>
    ) {
      state.authRequestStatus = payload;
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
          state.systemMessage = {
            message: 'You have successfully registered',
            severity: 'positive',
          };
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
          state.systemMessage = {
            message: 'You have successfully logged in',
            severity: 'positive',
          };
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
  actions: {
    setCurrentLanguage,
    setIsFirstLoad,
    setSystemMessage,
    setIsAuth,
    setToken,
    setUserEmail,
    setUserId,
    setAuthRequestStatus,
  },
} = mainSlice;

export const getCurrentLanguage = ({ main: { currentLanguage } }: RootState) => currentLanguage;
export const getIsFirstLoad = ({ main: { isFirstLoad } }: RootState) => isFirstLoad;
export const getIsAuth = ({ main: { isAuth } }: RootState) => isAuth;
export const getToken = ({ main: { token } }: RootState) => token;
export const getUserId = ({ main: { userId } }: RootState) => userId;
export const getUserEmail = ({ main: { userEmail } }: RootState) => userEmail;
export const getSystemMessage = ({ main: { systemMessage } }: RootState) => systemMessage;
export const getAuthRequestStatus = ({ main: { authRequestStatus } }: RootState) =>
  authRequestStatus;

export const { reducer } = mainSlice;
