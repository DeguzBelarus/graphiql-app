import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';

import {
  getIsFirstLoad,
  setIsFirstLoad,
  getIsAuth,
  setIsAuth,
  setSystemMessage,
  setToken,
  setUserEmail,
  setUserId,
  setCurrentLanguage,
} from './redux/slices/mainSlice';
import { useRoutes } from './hooks/useRoutes';
import { useAuthReset } from './hooks/useAuthReset';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { SystemMessage } from './components/SystemMessage/SystemMessage';
import { auth } from './firebase';
import { CurrentLanguageType, ITokenDecodedData } from './types/types';

import './App.scss';

export const App = () => {
  const dispatch = useAppDispatch();
  const routes = useRoutes();
  const authReset = useAuthReset();
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  const isAuth = useAppSelector(getIsAuth);
  const isFirstLoad = useAppSelector(getIsFirstLoad);

  const [isAuthRefreshed, setIsAuthRefreshed] = useState(false);

  useEffect(() => {
    if (isFirstLoad) {
      if (localStorage.getItem('i18nextLng')) {
        const languageSave = localStorage.getItem('i18nextLng') as CurrentLanguageType;
        dispatch(setCurrentLanguage(languageSave));
      }
      dispatch(setIsFirstLoad(false));
    }

    if (user) {
      !isAuthRefreshed &&
        (async function () {
          const token = await user.getIdToken();
          const tokenDecodeData: ITokenDecodedData = jwtDecode(token);
          if (Date.now() >= tokenDecodeData.exp * 1000) {
            if (isAuth) {
              authReset();
              dispatch(setSystemMessage({ message: `${t('tokenExpired')}`, severity: 'negative' }));
            }
          } else {
            dispatch(setIsAuth(true));
            dispatch(setToken(token));
            dispatch(setUserEmail(tokenDecodeData.email));
            dispatch(setUserId(tokenDecodeData.user_id));
          }
          setIsAuthRefreshed(true);
        })();
    }
  }, [authReset, dispatch, isAuth, isAuthRefreshed, isFirstLoad, t, user]);
  return (
    <>
      <Header />
      {routes}
      <Footer />
      <SystemMessage />
    </>
  );
};
