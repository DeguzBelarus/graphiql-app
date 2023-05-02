import { FC } from 'react';
import AboutProject from '../../components/AboutProject/AboutProject';

import './WelcomePage.scss';

export const WelcomePage: FC = () => {
  return (
    <div className="welcome-page-wrapper">
      <AboutProject />
    </div>
  );
};
