import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { setGraphQlQuery, getGraphQlQuery } from '../../redux/slices/mainSlice';
import './RequestEditor.scss';
import { Textarea } from '../Textarea/Textarea';
import { useTranslation } from 'react-i18next';

export const RequestEditor: FC = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const graphQlQuery = useAppSelector(getGraphQlQuery);

  const graphqlQueryUpdate = () => {
    let operationName = '';
    const query = value;

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
    graphqlQueryUpdate();
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
