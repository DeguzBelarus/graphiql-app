import { FC } from 'react';

import { RequestEditor } from '../RequestEditor/RequestEditor';
import { VariablesEditor } from '../VariablesEditor/VariablesEditor';
import { EditorToolbar } from '../EditorToolbar/EditorToolbar';
import { GraphQlEndpoint } from '../GraphQlEndpoint/GraphQlEndpoint';
import './Editors.scss';

export const Editors: FC = () => {
  return (
    <div className="editors-wrapper">
      <GraphQlEndpoint />
      <div className="request-wrapper">
        <RequestEditor />
        <EditorToolbar />
      </div>
      <VariablesEditor />
    </div>
  );
};
