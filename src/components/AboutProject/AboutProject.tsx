import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { getIsAuth } from '../../redux/slices/userSlice';
import './AboutProject.scss';

const AboutProject = () => {
  const isAuth = useAppSelector(getIsAuth);

  return (
    <section className="project">
      <div className="project__wrapper">
        <div className="project__content">
          <h1 className="project__title">GraphiQL</h1>
          <h4 className="project__description">
            GraphQL is a query language designed to build client applications by providing an
            intuitive and flexible syntax and system for describing their data requirements and
            interactions.
          </h4>
          <div className="project__button">
            {!isAuth ? (
              <>
                <Link className="button__link" to="/login">
                  Sign In
                </Link>
                <Link className="button__link link--colored" to="/registration">
                  Sign Up
                </Link>
              </>
            ) : (
              <li>
                <Link className="button__link link--colored" to="/graphql">
                  Go to Main Page
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
