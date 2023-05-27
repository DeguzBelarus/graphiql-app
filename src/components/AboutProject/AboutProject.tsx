import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../redux/hooks';
import AppScreen from '../../assets/images/app.jpg';

import { getIsAuth } from '../../redux/slices/mainSlice';
import './AboutProject.scss';

const AboutProject = () => {
  const { t } = useTranslation();

  const isAuth = useAppSelector(getIsAuth);

  return (
    <section className="project">
      <div className="project__button">
        {!isAuth ? (
          <>
            <Link className="button__link" to="/login">
              {t('signIn')}
            </Link>
            <Link className="button__link link--colored" to="/registration">
              {t('signUp')}
            </Link>
          </>
        ) : (
          <Link className="button__link link--colored" to="/graphql">
            {t('graphiQLNow')}
          </Link>
        )}
      </div>
      <div className="project__wrapper">
        <div className="project__content">
          <h1 className="project__title">GraphiQL</h1>
          <h4 className="project__description">{t('projectDescription')}</h4>
        </div>
        <div className="project__image">
          <img src={AppScreen} alt="GraphQL" />
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
