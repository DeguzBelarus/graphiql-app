import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { setSystemMessage, getIsAuth } from '../../redux/slices/mainSlice';
import { logout } from '../../firebase';
import { LanguagePicker } from '../LanguagePicker/LanguagePicker';
import Logo from '../../assets/images/logo.png';
import { ReactComponent as LogOut } from '../../assets/icons/logout.svg';
import variables from '../../styles/_variables.scss';
import { useAuthReset } from '../../hooks/useAuthReset';
import './Header.scss';

export const Header: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);
  const authReset = useAuthReset();

  const [headerColor, setHeaderColor] = useState(false);

  const header = variables.headerHeight.replace('px', '');

  const changeHeaderColor = () => {
    setHeaderColor(window.scrollY >= +header);
  };

  const logoutHandler = () => {
    logout();
    authReset();
    dispatch(
      setSystemMessage({ message: `${t('youSuccessfullyLoggedOut')}`, severity: 'positive' })
    );
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

      {isAuth && (
        <div className="auth-button-wrapper">
          <Link to="/">
            <button
              type="button"
              className="primary-button button-with-icon"
              onClick={logoutHandler}
            >
              <span>{t('logOut')}</span>
              <LogOut />
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};
