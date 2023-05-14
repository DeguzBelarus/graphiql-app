import { FC } from 'react';

import { RequestEditor } from '../RequestEditor/RequestEditor';
import { EditorToolbar } from '../EditorToolbar/EditorToolbar';
import { GraphQlEndpoint } from '../GraphQlEndpoint/GraphQlEndpoint';
import './Editors.scss';
import { Tabs } from '../Tabs/Tabs';

export const Editors: FC = () => {
  return (
    <div className="editors-wrapper">
      <GraphQlEndpoint />
      <div className="request-wrapper">
        <RequestEditor />
        <EditorToolbar />
      </div>
      <div className="tabs-wraper">
        <Tabs />
      </div>
    </div>
  );
};
