import { FC } from 'react';
import AboutProject from '../../components/AboutProject/AboutProject';
import AboutSchool from '../../components/AboutSchool/AboutSchool';
import AboutTeam from '../../components/AboutTeam/AboutTeam';

import './WelcomePage.scss';

export const WelcomePage: FC = () => {
  return (
    <main className="welcome-page-wrapper">
      <AboutProject />
      <AboutTeam />
      <AboutSchool />
    </main>
  );
};
