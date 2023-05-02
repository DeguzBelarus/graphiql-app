import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import { Input } from './Input/Input';
import { IAuthFormData } from '../../types/types';
import { FORM_DATA_DEFAULTS } from './constants';
import './AuthForm.scss';

type AuthFormType = 'login-form' | 'registration-form';

interface Props {
  type: AuthFormType;
}

export const AuthForm: FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState<IAuthFormData>(FORM_DATA_DEFAULTS);
  const [registrationFormData, setRegistrationFormData] =
    useState<IAuthFormData>(FORM_DATA_DEFAULTS);

  const loginFormDataUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [event.target.name]: event.target.value });
  };

  const registrationFormDataUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationFormData({ ...registrationFormData, [event.target.name]: event.target.value });
  };

  const submit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form className="auth-form">
      {type === 'login-form' ? (
        <>
          <div className="upper-container">
            <img className="main-logo-in-form" src={logo} alt="logo" />
            <h1>Log in</h1>
          </div>
          <Input type="email" value={loginFormData.email} setValue={loginFormDataUpdate} />
          <Input type="password" value={loginFormData.password} setValue={loginFormDataUpdate} />
          <div className="lower-container">
            <button type="submit" className="login-button">
              log in
            </button>
            <button
              type="button"
              className="to-registration-button"
              onClick={() => navigate('/registration')}
            >
              registration
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="upper-container">
            <img className="main-logo-in-form" src={logo} alt="logo" />
            <h1>Registration</h1>
          </div>
          <Input
            type="email"
            value={registrationFormData.email}
            setValue={registrationFormDataUpdate}
          />
          <Input
            type="password"
            value={registrationFormData.password}
            setValue={registrationFormDataUpdate}
          />
          <div className="lower-container">
            <button type="button" className="to-login-button" onClick={() => navigate('/login')}>
              back
            </button>
            <button type="submit" className="registration-button">
              register
            </button>
          </div>
        </>
      )}
    </form>
  );
};
