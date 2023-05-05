import React from 'react';
import { useTranslation } from 'react-i18next';
import './AboutSchool.scss';

const AboutSchool = () => {
  const { t } = useTranslation();

  return (
    <section className="school">
      <div className="school__wrapper">
        <h2 className="school__title">{t('ourSchool')}</h2>
        <div className="school__content">
          <div className="school__image">
            <img src="https://rs.school/images/rs_school.svg" alt="RS SCHOOL" />
          </div>
          <div className="school__description">
            <p className="school__text">
              <strong>
                <a className="school__link" href="https://rs.school/index.html">
                  RS School
                </a>
              </strong>{' '}
              {t('aboutSchoolText1')}
            </p>
            <p className="school__text">{t('aboutSchoolText2')}</p>
            <p className="school__text">{t('aboutSchoolText3')}</p>
            <p className="school__text">{t('aboutSchoolText4')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSchool;
