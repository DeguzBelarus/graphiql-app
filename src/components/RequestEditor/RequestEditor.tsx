import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { setGraphQlQuery, getGraphQlQuery } from '../../redux/slices/mainSlice';
import './RequestEditor.scss';
import { Textarea } from '../Textarea/Textarea';

export const RequestEditor: FC = () => {
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
        name="test-textarea"
        value={value}
        onValueChange={(value) => updateRequest(value)}
        numOfLines={1}
        placeholder="Enter a query"
      />
    </div>
  );
};
