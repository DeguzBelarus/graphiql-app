import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import jwtDecode from 'jwt-decode';

import {
  getIsAuth,
  setIsAuth,
  setSystemMessage,
  setToken,
  setUserEmail,
  setUserId,
  setAuthRequestStatus,
} from './redux/slices/userSlice';
import { useRoutes } from './hooks/useRoutes';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { SystemMessage } from './components/SystemMessage/SystemMessage';
import { auth } from './firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { ITokenDecodedData } from './types/types';
import './App.scss';

export const App = () => {
  const dispatch = useAppDispatch();
  const routes = useRoutes();
  const isAuth = useAppSelector(getIsAuth);

  useEffect(() => {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        dispatch(setAuthRequestStatus('loading'));
        const token = await user.getIdToken();
        const tokenDecodeData: ITokenDecodedData = jwtDecode(token);
        if (Date.now() >= tokenDecodeData.exp * 1000) {
          if (isAuth) {
            dispatch(setIsAuth(false));
            dispatch(setToken(null));
            dispatch(setUserEmail(null));
            dispatch(setUserId(null));
            dispatch(setSystemMessage({ message: 'Token expired', severity: 'negative' }));
          }
        } else {
          dispatch(setIsAuth(true));
          dispatch(setToken(token));
          dispatch(setUserEmail(tokenDecodeData.email));
          dispatch(setUserId(tokenDecodeData.user_id));
        }
        dispatch(setAuthRequestStatus('idle'));
      } else {
        if (isAuth) {
          dispatch(setIsAuth(false));
          dispatch(setToken(null));
          dispatch(setUserEmail(null));
          dispatch(setUserId(null));
        }
      }
    });
  }, [dispatch, isAuth]);
  return (
    <>
      <Header />
      {routes}
      <Footer />
      <SystemMessage />
    </>
  );
};
