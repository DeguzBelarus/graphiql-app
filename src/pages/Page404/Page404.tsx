import { FC } from 'react';

import './Page404.scss';
import { Header } from '../../components/Header/Header';

export const Page404: FC = () => {
  return (
    <>
      <Header />
      <div className="page-404-wrapper">Page404 works!</div>
    </>
  );
};
