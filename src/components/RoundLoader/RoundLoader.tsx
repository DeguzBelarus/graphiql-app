import { FC } from 'react';

import './RoundLoader.scss';

export const RoundLoader: FC = () => {
  return (
    <div className="round-loader-wrapper">
      <span className="round-loader"></span>
    </div>
  );
};
