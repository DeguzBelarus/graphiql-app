import { useRoutes } from '../hooks/useRoutes';
import { Footer } from './Footer/Footer';

export const App = () => {
  const routes = useRoutes();
  return (
    <>
      {routes}
      <Footer />
    </>
  );
};
