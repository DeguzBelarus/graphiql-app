import { createAsyncThunk } from '@reduxjs/toolkit';

import { logInWithEmailAndPassword, registerWithEmailAndPassword } from '../firebase';
import { IAuthFormData, Nullable, Undefinable } from '../types/types';
import { IGraphqlRequest, IGraphqlResponse, IUserAuthResponse } from './types';
import { requestData } from './dataAPI';

// firebase auth thunks
// register a new user
export const registerUserAsync = createAsyncThunk(
  'user/registration',
  async (data: IAuthFormData): Promise<Undefinable<IUserAuthResponse>> => {
    const userCredential = await registerWithEmailAndPassword(data.email, data.password);
    if (userCredential?.user) {
      const token = await userCredential?.user.getIdToken();
      const payload: IUserAuthResponse = { token };
      payload.userId = userCredential.user.uid;
      if (userCredential.user.email) {
        payload.userEmail = userCredential.user.email;
      }
      return payload;
    }
  }
);

// login user
export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (data: IAuthFormData): Promise<Undefinable<IUserAuthResponse>> => {
    const userCredential = await logInWithEmailAndPassword(data.email, data.password);
    if (userCredential?.user) {
      const token = await userCredential?.user.getIdToken();
      const payload: IUserAuthResponse = { token };
      payload.userId = userCredential.user.uid;
      if (userCredential.user.email) {
        payload.userEmail = userCredential.user.email;
      }
      return payload;
    }
  }
);

// send graphql request
export const sendGraphqlRequestAsync = createAsyncThunk(
  'editor/request-send',
  async (data: IGraphqlRequest): Promise<Nullable<IGraphqlResponse>> => {
    const graphqlResponse: Undefinable<Response> = await requestData(
      data.endpoint,
      data.queryData,
      data.headers
    );
    if (graphqlResponse) {
      const graphqlResponseData: IGraphqlResponse = await graphqlResponse.json();
      return graphqlResponseData;
    }
    return null;
  }
);
