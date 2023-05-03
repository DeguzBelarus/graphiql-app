import React from 'react';
import './AboutSchool.scss';

const AboutSchool = () => {
  return (
    <section className="school">
      <div className="school__wrapper">
        <h2 className="school__title">Our School</h2>
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
              is free-of-charge and community-based education program conducted by The Rolling
              Scopes developer community since 2013.
            </p>
            <p className="school__text">
              Everyone can study at RS School, regardless of age, professional employment, or place
              of residence.
            </p>
            <p className="school__text">
              The mentors and trainers of our school are front-end and javascript developers from
              different companies and countries.
            </p>
            <p className="school__text">
              This application was created as the final task of the React course of the{' '}
              <strong>
                <a className="school__link" href="https://rs.school/index.html">
                  RS School.
                </a>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSchool;
