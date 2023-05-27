import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import translationEn from './locales/en/translation.json';
import translationRu from './locales/ru/translation.json';

import { App } from './App';
import './index.scss';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      ru: { translation: translationRu },
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

const container = document.getElementById('root')!;
const root = createRoot(container);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
root.render(app);
