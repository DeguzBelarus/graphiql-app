import { useRoutes } from './hooks/useRoutes';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import './App.scss';

export const App = () => {
  const routes = useRoutes();
  return (
    <>
      <Header />
      {routes}
      <Footer />
    </>
  );
};
