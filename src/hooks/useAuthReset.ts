import { useAppDispatch } from '../redux/hooks';
import { setIsAuth, setToken, setUserEmail, setUserId } from '../redux/slices/userSlice';

export const useAuthReset = () => {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(setIsAuth(false));
    dispatch(setToken(null));
    dispatch(setUserEmail(null));
    dispatch(setUserId(null));
  };
};
