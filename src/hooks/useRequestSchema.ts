import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { GraphQLSchema } from 'graphql';
import { useTranslation } from 'react-i18next';

import { Undefinable } from '../types/types';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import {
  setSystemMessage,
  getIsGraphqlSchemaReceived,
  setIsGraphqlSchemaReceived,
} from '../redux/slices/mainSlice';

type SuspendingStatusType = 'pending' | 'success' | 'error';

export const useRequestSchema = (endpoint: string) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isGraphqlSchemaReceived = useAppSelector(getIsGraphqlSchemaReceived);

  const requestSchema = async (endpoint: string) => {
    try {
      const executor = buildHTTPExecutor({ endpoint });
      const subschema = {
        schema: await schemaFromExecutor(executor),
        executor,
      };
      dispatch(
        setSystemMessage({ message: `${t('schemaFetchedSuccessfully')}`, severity: 'positive' })
      );
      return subschema.schema;
    } catch (error) {
      dispatch(setSystemMessage({ message: `${t('errorGettingSchema')}`, severity: 'negative' }));
      isGraphqlSchemaReceived && dispatch(setIsGraphqlSchemaReceived(false));
    }
  };

  return () => {
    let status: SuspendingStatusType = 'pending';
    let result: Undefinable<GraphQLSchema>;
    const suspender = requestSchema(endpoint).then(
      (value) => {
        result = value;
        status = 'success';
      },
      (error) => {
        result = error;
        status = 'error';
      }
    );
    return {
      read() {
        if (status === 'pending') {
          throw suspender;
        } else if (status === 'error') {
          throw result;
        } else return result;
      },
    };
  };
};
