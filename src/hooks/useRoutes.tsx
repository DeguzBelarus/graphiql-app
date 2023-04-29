import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

import { getIsAuth } from '../redux/slices/userSlice';
import { WelcomePage } from '../pages/WelcomePage/WelcomePage';
import { GraphQlPage } from '../pages/GraphQlPage/GraphQlPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';

export const useRoutes = () => {
  const isAuth = useAppSelector(getIsAuth);
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/login" element={!isAuth ? <LoginPage /> : <WelcomePage />}></Route>
      <Route
        path="/registration"
        element={!isAuth ? <RegistrationPage /> : <WelcomePage />}
      ></Route>
      <Route path="/graphql" element={!isAuth ? <GraphQlPage /> : <WelcomePage />}></Route>
      <Route path="*" element={<WelcomePage />}></Route>
    </Routes>
  );
};
