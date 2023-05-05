import { useAppSelector } from '../redux/hooks';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import { getIsAuth } from '../redux/slices/mainSlice';
import { WelcomePage } from '../pages/WelcomePage/WelcomePage';
import { GraphQlPage } from '../pages/GraphQlPage/GraphQlPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { Page404 } from '../pages/Page404/Page404';
import { ProcessingPage } from '../pages/ProcessingPage/ProcessingPage';

export const useRoutes = () => {
  const [user, loading] = useAuthState(auth);
  const isAuth = useAppSelector(getIsAuth);
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route
        path="/login"
        element={!user && !isAuth ? <LoginPage /> : <Navigate to={'/'} />}
      ></Route>
      <Route
        path="/registration"
        element={!user && !isAuth ? <RegistrationPage /> : <Navigate to={'/'} />}
      ></Route>
      <Route
        path="/graphql"
        element={user && isAuth ? <GraphQlPage /> : loading ? <ProcessingPage /> : <Page404 />}
      ></Route>
      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  );
};
