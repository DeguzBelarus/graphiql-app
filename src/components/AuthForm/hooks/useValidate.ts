import { useAppDispatch } from '../../../redux/hooks';
import { useTranslation } from 'react-i18next';

import { setSystemMessage } from '../../../redux/slices/userSlice';
import { hasDigitChecking, hasLetterChecking, hasSpecCharChecking } from '../utils';

type ValidationType = 'login' | 'registration';

export const useValidate = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const validateEmail = (email: string, type: ValidationType): boolean => {
    if (!email) {
      dispatch(
        setSystemMessage({
          message:
            type === 'login' ? `${t('enterEmailForLogin')}` : `${t('enterEmailForRegistration')}`,
          severity: 'negative',
        })
      );
      return false;
    }
    const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/;
    if (!email.match(pattern) || email.length < 8) {
      dispatch(
        setSystemMessage({
          message: `${t('enterCorrectEmailAddress')}`,
          severity: 'negative',
        })
      );
      return false;
    }
    return true;
  };

  const validatePassword = (password: string, type: ValidationType): boolean => {
    if (!password) {
      dispatch(
        setSystemMessage({
          message:
            type === 'login'
              ? `${t('enterPasswordForLogin')}`
              : `${t('enterPasswordForRegistration')}`,
          severity: 'negative',
        })
      );
      return false;
    }
    if (type === 'registration') {
      if (password.length < 8) {
        dispatch(
          setSystemMessage({
            message: `${t('minPasswordLength8Chars')}`,
            severity: 'negative',
          })
        );
        return false;
      }
      if (!hasLetterChecking(password)) {
        dispatch(
          setSystemMessage({
            message: `${t('atLeastOneLetterInPassword')}`,
            severity: 'negative',
          })
        );
        return false;
      }
      if (!hasDigitChecking(password)) {
        dispatch(
          setSystemMessage({
            message: `${t('atLeastOneDigitInPassword')}`,
            severity: 'negative',
          })
        );
        return false;
      }
      if (!hasSpecCharChecking(password)) {
        dispatch(
          setSystemMessage({
            message: `${t('atLeastOneSpecCharInPassword')}`,
            severity: 'negative',
          })
        );
        return false;
      }
    }
    return true;
  };

  return { validateEmail, validatePassword };
};
