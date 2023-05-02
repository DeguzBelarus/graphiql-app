import { FC } from 'react';
import './Header.scss';
import Logo from '../../assets/images/logo.png';
import { LanguagePicker } from '../LanguagePicker/LanguagePicker';

export const Header: FC = () => {
  return (
    <header className="app-container">
      <div className="logo-wrapper">
        <img src={Logo} alt="logo" />

        <LanguagePicker />
      </div>

      <button className="primary-button">{true ? 'Sign In' : 'Sign Up'}</button>
    </header>
  );
};
