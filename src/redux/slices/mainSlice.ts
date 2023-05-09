import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from '../store';

import { CurrentLanguageType, ISystemMessageObject, Nullable } from '../../types/types';
import { IGraphqlQuery, MainState, RequestStatusType } from '../types';
import { loginUserAsync, registerUserAsync, sendGraphqlRequestAsync } from '../thunks';
import { EMPTY_GRAPHQL_QUERY, EMPTY_STRING } from '../../constants/constants';

const initialState: MainState = {
  currentLanguage: 'en',
  isFirstLoad: true,
  isAuth: false,
  token: null,
  userId: null,
  userEmail: null,
  systemMessage: null,
  authRequestStatus: 'idle',
  graphqlRequestStatus: 'idle',
  graphQlUrl: EMPTY_STRING,
  graphQlQuery: EMPTY_GRAPHQL_QUERY,
  graphqlResponse: null,
  variablesJSON: '',
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
    setGraphqlRequestStatus(
      state: WritableDraft<MainState>,
      { payload }: PayloadAction<RequestStatusType>
    ) {
      state.graphqlRequestStatus = payload;
    },
    setGraphQlUrl(state: WritableDraft<MainState>, { payload }: PayloadAction<string>) {
      state.graphQlUrl = payload;
    },
    setGraphQlQuery(state: WritableDraft<MainState>, { payload }: PayloadAction<IGraphqlQuery>) {
      state.graphQlQuery = payload;
    },
    setGraphqlResponse(
      state: WritableDraft<MainState>,
      { payload }: PayloadAction<Nullable<object>>
    ) {
      state.graphqlResponse = payload;
    },
    setVariablesJSON(state: WritableDraft<MainState>, { payload }: PayloadAction<string>) {
      state.variablesJSON = payload;
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
            message:
              state.currentLanguage !== 'ru'
                ? 'You have successfully registered'
                : 'Вы успешно зарегистрировались',
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
            message:
              state.currentLanguage !== 'ru'
                ? 'You have successfully logged in'
                : 'Вы успешно вошли в систему',
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
      })

      // get users by search key info
      .addCase(sendGraphqlRequestAsync.pending, (state) => {
        state.graphqlRequestStatus = 'loading';
      })
      .addCase(sendGraphqlRequestAsync.fulfilled, (state, { payload }) => {
        state.graphqlRequestStatus = 'idle';

        if (payload && payload.data && !payload.errors) {
          state.graphqlResponse = payload.data;
          state.systemMessage = {
            message:
              state.currentLanguage !== 'ru'
                ? 'Request completed successfully'
                : 'Запрос успешно выполнен',
            severity: 'positive',
          };
        }
        if (payload && payload.errors && !payload.data) {
          state.systemMessage = {
            message: payload.errors[0].message,
            severity: 'negative',
          };
        }
        if (payload && payload.errors && payload.data) {
          state.graphqlResponse = { ...payload.errors, ...payload.data };
          state.systemMessage = {
            message: payload.errors[0].message,
            severity: 'negative',
          };
        }
      })
      .addCase(sendGraphqlRequestAsync.rejected, (state, { error }) => {
        state.graphqlRequestStatus = 'failed';
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
    setGraphQlUrl,
    setGraphQlQuery,
    setGraphqlRequestStatus,
    setGraphqlResponse,
    setVariablesJSON,
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
export const getGraphQlUrl = ({ main: { graphQlUrl } }: RootState) => graphQlUrl;
export const getGraphQlQuery = ({ main: { graphQlQuery } }: RootState) => graphQlQuery;
export const getGraphqlRequestStatus = ({ main: { graphqlRequestStatus } }: RootState) =>
  graphqlRequestStatus;
export const getGraphqlResponse = ({ main: { graphqlResponse } }: RootState) => graphqlResponse;
export const getVariablesJSON = ({ main: { variablesJSON } }: RootState) => variablesJSON;

export const { reducer } = mainSlice;
