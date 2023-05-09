import { IGraphqlQuery } from './types';

export const requestData = (endpoint: string, graphqlQuery: IGraphqlQuery) => {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphqlQuery),
  });
};
