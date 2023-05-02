import { useRoutes } from './hooks/useRoutes';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
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
