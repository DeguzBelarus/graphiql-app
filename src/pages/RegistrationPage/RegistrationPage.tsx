import { FC } from 'react';

import { AuthForm } from '../../components/AuthForm/AuthForm';
import './RegistrationPage.scss';

export const RegistrationPage: FC = () => {
  return (
    <div className="registration-page-wrapper">
      <AuthForm type="registration-form" />
    </div>
  );
};
