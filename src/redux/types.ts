import { CurrentLanguageType, ISystemMessageObject, Nullable, Undefinable } from '../types/types';

// redux types
export type RequestStatusType = 'idle' | 'loading' | 'failed';

// redux initial state interfaces
export interface MainState {
  currentLanguage: CurrentLanguageType;
  isFirstLoad: boolean;
}

export interface UserState {
  isAuth: boolean;
  token: Nullable<string>;
  userId: Nullable<string>;
  userEmail: Nullable<string>;
  systemMessage: Nullable<ISystemMessageObject>;
  authRequestStatus: RequestStatusType;
}

export interface IAuthFirebaseError {
  code: number;
  message: string;
}

export interface IUserAuthResponse {
  token?: Undefinable<string>;
  userId?: string;
  userEmail?: string;
}
