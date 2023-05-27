import { FC } from 'react';

import { Editors } from '../Editors/Editors';
import { Response } from '../Response/Response';
import './Graphiql.scss';

export const Graphiql: FC = () => {
  return (
    <div className="graphiql-wrapper">
      <Editors />
      <Response />
    </div>
  );
};
