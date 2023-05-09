import { IGraphqlQuery } from '../redux/types';

export const SYSTEM_MESSAGE_AUTO_HIDE_DURATION = 6000;
export const EMPTY_STRING = '';
export const EMPTY_GRAPHQL_QUERY: IGraphqlQuery = { query: EMPTY_STRING, variables: null };
