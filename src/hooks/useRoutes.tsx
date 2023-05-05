import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

import { getIsAuth } from '../redux/slices/userSlice';
import { WelcomePage } from '../pages/WelcomePage/WelcomePage';
import { GraphQlPage } from '../pages/GraphQlPage/GraphQlPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { Page404 } from '../pages/Page404/Page404';

export const useRoutes = () => {
  const isAuth = useAppSelector(getIsAuth);
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/login" element={!isAuth ? <LoginPage /> : <Navigate to={'/'} />}></Route>
      <Route
        path="/registration"
        element={!isAuth ? <RegistrationPage /> : <Navigate to={'/'} />}
      ></Route>
      <Route path="/graphql" element={isAuth ? <GraphQlPage /> : <Page404 />}></Route>
      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  );
};
