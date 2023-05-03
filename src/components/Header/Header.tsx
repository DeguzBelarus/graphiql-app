import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { LanguagePicker } from '../LanguagePicker/LanguagePicker';
import { getIsAuth } from '../../redux/slices/userSlice';
import Logo from '../../assets/images/logo.png';
import { ReactComponent as SignIn } from '../../assets/icons/signin.svg';
import { ReactComponent as SignUp } from '../../assets/icons/signup.svg';
import { ReactComponent as Visit } from '../../assets/icons/visit.svg';
import { ReactComponent as LogOut } from '../../assets/icons/logout.svg';

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
            <button type="button" className="primary-button button-with-icon">
              <span>Sign In</span>
              <SignIn />
            </button>
          </Link>
          <Link to="/registration">
            <button type="button" className="primary-button button-with-icon">
              <span>Sign Up</span>
              <SignUp />
            </button>
          </Link>
        </div>
      )}

      {isAuth && (
        <div className="auth-button-wrapper">
          <Link to="/graphql">
            <button type="button" className="danger-button button-with-icon">
              <span>Try GraphiQL now!</span>
              <Visit />
            </button>
          </Link>
          <Link to="/">
            <button type="button" className="primary-button button-with-icon">
              <span>Log Out</span>
              <LogOut />
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};
