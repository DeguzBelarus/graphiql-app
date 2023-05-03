import { createAsyncThunk } from '@reduxjs/toolkit';

import { logInWithEmailAndPassword, registerWithEmailAndPassword } from '../firebase';
import { IAuthFormData, Undefinable } from '../types/types';
import { IUserAuthResponse } from './types';

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
