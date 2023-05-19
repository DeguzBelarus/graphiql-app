import { CurrentLanguageType, ISystemMessageObject, Nullable, Undefinable } from '../types/types';

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
  schemaRequestStatus: RequestStatusType;
  graphQlUrl: string;
  graphQlUrlSubmitted: string;
  graphQlQuery: IGraphqlQuery;
  variablesJSON: string;
  graphqlResponse: Nullable<object>;
  graphqlSchemaPrint: Nullable<string>;
  isGraphqlSchemaReceived: boolean;
  currentSchemaType: Array<string>;
  currentRequestHeaders: HeadersInit;
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

export interface IGraphqlQuery {
  query: string;
  variables: Nullable<object>;
  operationName?: string;
}

export interface IGraphqlRequest {
  endpoint: string;
  headers: HeadersInit;
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
