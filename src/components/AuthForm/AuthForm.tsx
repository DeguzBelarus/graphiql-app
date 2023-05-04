import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { getAuthRequestStatus } from '../../redux/slices/userSlice';
import { hasDigitChecking, hasLetterChecking, hasSpecCharChecking } from './utils';
import logo from '../../assets/images/logo.png';
import { Input } from './Input/Input';
import { IAuthFormData } from '../../types/types';
import { FORM_DATA_DEFAULTS } from './constants';
import { useValidate } from './hooks/useValidate';
import { loginUserAsync, registerUserAsync } from '../../redux/thunks';
import './AuthForm.scss';

type AuthFormType = 'login-form' | 'registration-form';

interface Props {
  type: AuthFormType;
}

export const AuthForm: FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { validateEmail, validatePassword } = useValidate();

  const requestStatus = useAppSelector(getAuthRequestStatus);

  const [loginFormData, setLoginFormData] = useState<IAuthFormData>(FORM_DATA_DEFAULTS);
  const [registrationFormData, setRegistrationFormData] =
    useState<IAuthFormData>(FORM_DATA_DEFAULTS);

  const loginFormDataUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [event.target.name]: event.target.value });
  };

  const registrationFormDataUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationFormData({ ...registrationFormData, [event.target.name]: event.target.value });
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (type === 'login-form') {
      if (
        validateEmail(loginFormData.email, 'login') &&
        validatePassword(loginFormData.password, 'login')
      ) {
        dispatch(
          loginUserAsync({
            email: loginFormData.email,
            password: loginFormData.password,
          })
        );
      }
    }
    if (type === 'registration-form') {
      if (
        validateEmail(registrationFormData.email, 'registration') &&
        validatePassword(registrationFormData.password, 'registration')
      ) {
        dispatch(
          registerUserAsync({
            email: registrationFormData.email,
            password: registrationFormData.password,
          })
        );
      }
    }
  };
  return (
    <form
      className="auth-form"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => submit(event)}
    >
      {type === 'login-form' ? (
        <>
          <div className="upper-container">
            <img className="main-logo-in-form" src={logo} alt="logo" />
            <h1>Log in</h1>
          </div>
          <Input type="email" value={loginFormData.email} setValue={loginFormDataUpdate} />
          <Input type="password" value={loginFormData.password} setValue={loginFormDataUpdate} />
          <div className="lower-container">
            <button type="submit" className="login-button" disabled={requestStatus === 'loading'}>
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
              to login
            </button>
            <button
              type="submit"
              className="registration-button"
              disabled={requestStatus === 'loading'}
            >
              register
            </button>
          </div>
          {registrationFormData.password.length ? (
            <div className="password-requirements-container">
              <span className={registrationFormData.password.length >= 8 ? 'confirmed' : undefined}>
                Minimum password length is 8 characters
              </span>
              <span
                className={
                  hasLetterChecking(registrationFormData.password) ? 'confirmed' : undefined
                }
              >
                At least one letter in the password
              </span>
              <span
                className={
                  hasDigitChecking(registrationFormData.password) ? 'confirmed' : undefined
                }
              >
                At least one digit in the password
              </span>
              <span
                className={
                  hasSpecCharChecking(registrationFormData.password) ? 'confirmed' : undefined
                }
              >
                At least one special character
              </span>
            </div>
          ) : null}
        </>
      )}
    </form>
  );
};
