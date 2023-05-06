import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../redux/hooks';
import { getIsAuth } from '../../redux/slices/mainSlice';

import './AboutProject.scss';

const AboutProject = () => {
  const { t } = useTranslation();

  const isAuth = useAppSelector(getIsAuth);

  return (
    <section className="project">
      <div className="project__wrapper">
        <div className="project__content">
          <h1 className="project__title">GraphiQL</h1>
          <h4 className="project__description">{t('projectDescription')}</h4>
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
              <li>
                <Link className="button__link link--colored" to="/graphql">
                  {t('graphiQLNow')}
                </Link>
              </li>
            )}
          </div>
        </div>
        <div className="project__image">
          <img
            src="https://raw.githubusercontent.com/antoinecellier/graphiql/HEAD/resources/graphiql.png"
            alt="GraphQL"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
