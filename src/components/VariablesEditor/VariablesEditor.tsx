import React, { FC, useRef } from 'react';
import { useAppDispatch } from '../../redux/hooks';

import { setVariablesJSON } from '../../redux/slices/mainSlice';
import './VariablesEditor.scss';

export const VariablesEditor: FC = () => {
  const variablesEditorElement = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const graphqlQueryUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setVariablesJSON(event.target.value));
  };
  return (
    <div className="variables-editor">
      <textarea
        className="variables-editor-textarea"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        placeholder="Enter variables (JSON)"
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => graphqlQueryUpdate(event)}
        ref={variablesEditorElement}
      ></textarea>
    </div>
  );
};
