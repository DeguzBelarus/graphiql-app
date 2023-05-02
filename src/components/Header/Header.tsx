import { FC, useState } from 'react';
import './Header.scss';
import Logo from '../../assets/images/logo.png';
import { LanguagePicker } from '../LanguagePicker/LanguagePicker';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

export const Header: FC = () => {
  const isAuth = useAppSelector((state: RootState) => state.user.isAuth);

  const [headerColor, setHeaderColor] = useState<boolean>(false);

  const changeHeaderColor = () => {
    setHeaderColor(window.scrollY >= 80);
  };

  window.addEventListener('scroll', changeHeaderColor);

  return (
    <header className={headerColor ? 'app-container active' : 'app-container'}>
      <div className="logo-wrapper">
        <a href="/">
          <img src={Logo} alt="logo" />
        </a>
        <LanguagePicker />
      </div>

      <button className="primary-button">{isAuth ? 'Sign In' : 'Sign Up'}</button>
    </header>
  );
};
