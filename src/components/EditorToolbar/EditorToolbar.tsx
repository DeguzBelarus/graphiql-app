import React from 'react';
import './EditorToolbar.scss';
import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as Copy } from '../../assets/icons/copy.svg';

export const EditorToolbar = () => {
  return (
    <div className="editor-toolbar-wrapper">
      <button className="icon-button-danger">
        <Play title="Exequte query" />
      </button>
      <button className="icon-button">
        <Copy title="Copy query" />
      </button>
    </div>
  );
};
