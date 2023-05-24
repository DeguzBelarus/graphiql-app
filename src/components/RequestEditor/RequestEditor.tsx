import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { setGraphQlQuery, getGraphQlQuery } from '../../redux/slices/mainSlice';
import { Textarea } from '../Textarea/Textarea';
import { useTranslation } from 'react-i18next';
import './RequestEditor.scss';

export const RequestEditor: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const graphQlQuery = useAppSelector(getGraphQlQuery);

  const [value, setValue] = useState(graphQlQuery.query);

  const graphqlQueryUpdate = (queryFieldValue: string) => {
    let operationName = '';
    const query = queryFieldValue;

    if (query.split(' ').includes('query')) {
      operationName = query.split(' ')[1];
    }
    if (query.split(' ').includes('mutation')) {
      operationName = query.split(' ')[1];
    }

    dispatch(
      setGraphQlQuery(
        operationName ? { ...graphQlQuery, operationName, query } : { ...graphQlQuery, query }
      )
    );
  };

  const updateRequest = (value: string) => {
    setValue(value);
    graphqlQueryUpdate(value);
  };
  return (
    <div className="request-editor-wrapper">
      <Textarea
        value={value}
        onValueChange={(value) => updateRequest(value)}
        numOfLines={1}
        placeholder={t('main.enterQuery')}
      />
    </div>
  );
};
