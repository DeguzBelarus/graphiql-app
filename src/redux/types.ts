import { CurrentLanguageType, ISystemMessageObject, Nullable, Undefinable } from '../types/types';
import { IGraphqlQuery } from './dataAPI';
// redux types
export type RequestStatusType = 'idle' | 'loading' | 'failed';

// redux initial state interfaces
export interface MainState {
  currentLanguage: CurrentLanguageType;
  isFirstLoad: boolean;
  isAuth: boolean;
  token: Nullable<string>;
  userId: Nullable<string>;
  userEmail: Nullable<string>;
  systemMessage: Nullable<ISystemMessageObject>;
  authRequestStatus: RequestStatusType;
  graphqlRequestStatus: RequestStatusType;
  graphQlUrl: string;
  graphQlQuery: IGraphqlQuery;
  variablesJSON: string;
  graphqlResponse: Nullable<object>;
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

export interface IGraphqlRequest {
  endpoint: string;
  queryData: IGraphqlQuery;
}

interface IGraphqlResponseErrorLocationObject {
  line: number;
  column: number;
}

interface IGraphqlResponseErrorObject {
  locations: Array<IGraphqlResponseErrorLocationObject>;
  message: string;
}

export interface IGraphqlResponse {
  data?: object;
  errors?: Array<IGraphqlResponseErrorObject>;
}
