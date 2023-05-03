import React from 'react';
import './Graphiql.scss';
import { Editors } from '../Editors/Editors';
import { Response } from '../Response/Response';

export const Graphiql = () => {
  return (
    <div className="graphiql-wrapper">
      <Editors />
      <Response />
    </div>
  );
};
