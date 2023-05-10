import { FC, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { setGraphQlQuery, getGraphQlQuery } from '../../redux/slices/mainSlice';
import './RequestEditor.scss';

export const RequestEditor: FC = () => {
  const requestEditorElement = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const graphQlQuery = useAppSelector(getGraphQlQuery);

  const graphqlQueryUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let operationName = '';
    const query = event.target.value;

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
  return (
    <div className="request-editor-wrapper">
      <textarea
        className="request-editor-textarea"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        placeholder="Enter a query"
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => graphqlQueryUpdate(event)}
        ref={requestEditorElement}
      ></textarea>
    </div>
  );
};
