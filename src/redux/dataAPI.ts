import { Nullable } from '../types/types';

export interface IGraphqlQuery {
  query: string;
  operationName?: string;
  variables: Nullable<object>;
}

export const requestData = (endpoint: string, graphqlQuery: IGraphqlQuery) => {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphqlQuery),
  });
};
