import { useRoutes } from './hooks/useRoutes';
import { Footer } from './components/Footer/Footer';
import './App.scss';
import { Header } from './components/Header/Header';
export const App = () => {
  const routes = useRoutes();
  return (
    <>
      <Header />
      <div className="app-container">{routes}</div>
      <Footer />
    </>
  );
};
