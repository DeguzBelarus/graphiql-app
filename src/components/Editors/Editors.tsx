import React from 'react';
import './Editors.scss';
import { RequestEditor } from '../RequestEditor/RequestEditor';
import { VariablesEditor } from '../VariablesEditor/VariablesEditor';
import { EditorToolbar } from '../EditorToolbar/EditorToolbar';
export const Editors = () => {
  return (
    <div className="editors-wrapper">
      <div className="request-wrapper">
        <RequestEditor />
        <EditorToolbar />
      </div>
      <VariablesEditor />
    </div>
  );
};
