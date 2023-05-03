import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { LanguagePicker } from '../LanguagePicker/LanguagePicker';
import { getIsAuth } from '../../redux/slices/userSlice';
import Logo from '../../assets/images/logo.png';
import variables from '../../styles/_variables.scss';
import './Header.scss';

export const Header: FC = () => {
  const isAuth = useAppSelector(getIsAuth);

  const [headerColor, setHeaderColor] = useState(false);

  const header = variables.headerHeight.replace('px', '');

  const changeHeaderColor = () => {
    setHeaderColor(window.scrollY >= +header);
  };

  window.addEventListener('scroll', changeHeaderColor);
  return (
    <header className={headerColor ? 'app-container active' : 'app-container'}>
      <div className="logo-wrapper">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <LanguagePicker />
      </div>

      {!isAuth && (
        <div className="auth-button-wrapper">
          <Link to="/login">
            <button type="button" className="primary-button">
              Sign In
            </button>
          </Link>
          <Link to="/registration">
            <button type="button" className="primary-button">
              Sign Up
            </button>
          </Link>
        </div>
      )}

      {!isAuth && (
        <div className="auth-button-wrapper">
          <Link to="/graphql">
            <button type="button" className="secondary-button">
              Try GraphiQL now!
            </button>
          </Link>
          <Link to="/">
            <button type="button" className="primary-button">
              Log Out
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};
