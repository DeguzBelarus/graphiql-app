import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { getIsAuth } from '../../redux/slices/userSlice';

import './Page404.scss';

export const Page404: FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);

  return (
    <div className="page-404-wrapper">
      <h1>404</h1>
      <h4>{t('notFoundPageText')}</h4>
      <h4>{t('notFoundPageTitle')}</h4>
      <div className="page-404__button">
        <a className="button__link" onClick={() => navigate(-1)}>
          {t('back')}
        </a>
        <a
          className="button__link link--colored"
          onClick={() => (isAuth ? navigate('/graphql') : navigate('/'))}
        >
          {t('homePage')}
        </a>
      </div>
    </div>
  );
};
