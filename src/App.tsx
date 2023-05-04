import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import jwtDecode from 'jwt-decode';

import {
  getIsAuth,
  setIsAuth,
  setSystemMessage,
  setToken,
  setUserEmail,
  setUserId,
} from './redux/slices/userSlice';
import { getIsFirstLoad, setIsFirstLoad } from './redux/slices/mainSlice';
import { useRoutes } from './hooks/useRoutes';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { SystemMessage } from './components/SystemMessage/SystemMessage';
import { auth } from './firebase';
import { ITokenDecodedData } from './types/types';

import './App.scss';

export const App = () => {
  const dispatch = useAppDispatch();
  const routes = useRoutes();
  const [user] = useAuthState(auth);

  const isAuth = useAppSelector(getIsAuth);
  const isFirstLoad = useAppSelector(getIsFirstLoad);

  useEffect(() => {
    if (user) {
      if (isFirstLoad) {
        (async function () {
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
          dispatch(setIsFirstLoad(false));
        })();
      }
    } else {
      if (isAuth) {
        dispatch(setIsAuth(false));
        dispatch(setToken(null));
        dispatch(setUserEmail(null));
        dispatch(setUserId(null));
      }
    }
  }, [dispatch, isAuth, isFirstLoad, user]);
  return (
    <>
      <Header />
      {routes}
      <Footer />
      <SystemMessage />
    </>
  );
};
