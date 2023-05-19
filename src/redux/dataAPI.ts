import { IGraphqlQuery } from './types';

export const requestData = (
  endpoint: string,
  graphqlQuery: IGraphqlQuery,
  headers: HeadersInit
) => {
  return fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(graphqlQuery),
  });
};
