import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en/translation.json';
import translationRu from './locales/ru/translation.json';

import { useRoutes } from './hooks/useRoutes';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { SystemMessage } from './components/SystemMessage/SystemMessage';
import './App.scss';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    ru: { translation: translationRu },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export const App = () => {
  const routes = useRoutes();
  return (
    <>
      <Header />
      {routes}
      <Footer />
      <SystemMessage />
    </>
  );
};
