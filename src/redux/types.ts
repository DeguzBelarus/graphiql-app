import { CurrentLanguageType, ISystemMessageObject, Nullable } from '../types/types';

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
  userId: Nullable<number>;
  userEmail: Nullable<string>;
  systemMessage: Nullable<ISystemMessageObject>;
  authRequestStatus: RequestStatusType;
}
