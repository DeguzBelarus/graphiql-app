import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
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

export const requestSchema = async (endpoint: string) => {
  const executor = buildHTTPExecutor({ endpoint });
  const subschema = {
    schema: await schemaFromExecutor(executor),
    executor,
  };
  return subschema.schema;
};
