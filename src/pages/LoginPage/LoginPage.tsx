import { FC } from 'react';

import { AuthForm } from '../../components/AuthForm/AuthForm';
import './LoginPage.scss';

export const LoginPage: FC = () => {
  return (
    <div className="login-page-wrapper">
      <AuthForm type="login-form" />
    </div>
  );
};
