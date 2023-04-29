import { FC } from 'react';

import { Header } from '../../components/Header/Header';
import './WelcomePage.scss';

export const WelcomePage: FC = () => {
  return (
    <>
      <Header />
      <div className="welcome-page-wrapper">WelcomePage works!</div>
    </>
  );
};
