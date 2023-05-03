import { useAppDispatch } from '../../../redux/hooks';
import { setSystemMessage } from '../../../redux/slices/userSlice';

type ValidationType = 'login' | 'registration';

export const useValidate = () => {
  const dispatch = useAppDispatch();

  const validateEmail = (email: string, type: ValidationType): boolean => {
    if (!email) {
      dispatch(
        setSystemMessage({
          message: type === 'login' ? 'Enter email for log in' : 'Enter email for registration',
          severity: 'negative',
        })
      );
      return false;
    }
    const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/;
    if (!email.match(pattern) || email.length < 8) {
      dispatch(
        setSystemMessage({
          message: 'Enter correct email address',
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
              ? 'Enter the password for log in'
              : 'Enter the password for registration',
          severity: 'negative',
        })
      );
      return false;
    }
    if (type === 'registration') {
      if (password.length < 8) {
        dispatch(
          setSystemMessage({
            message: 'The minimum password length is 8 characters',
            severity: 'negative',
          })
        );
        return false;
      }
      if (password.search(/[A-Za-zА-Яа-яЁё]/) === -1) {
        dispatch(
          setSystemMessage({
            message: 'At least one letter in the password',
            severity: 'negative',
          })
        );
        return false;
      }
      if (password.search(/\d/) === -1) {
        dispatch(
          setSystemMessage({
            message: 'At least one digit in the password',
            severity: 'negative',
          })
        );
        return false;
      }
      if (password.search(/[!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) {
        dispatch(
          setSystemMessage({
            message: 'At least one special character in the password',
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
