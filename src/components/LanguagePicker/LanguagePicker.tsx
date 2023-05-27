import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import i18n from 'i18next';

import { setCurrentLanguage, getCurrentLanguage } from '../../redux/slices/mainSlice';
import './LanguagePicker.scss';

export const LanguagePicker = () => {
  const dispatch = useAppDispatch();

  const currentLanguage = useAppSelector(getCurrentLanguage);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(setCurrentLanguage(currentLanguage === 'en' ? 'ru' : 'en'));
  };

  return (
    <div className="switch">
      <input
        id="language-toggle"
        className="check-toggle check-toggle-round-flat"
        checked={currentLanguage === 'en'}
        title=""
        type="checkbox"
        onChange={() => {
          changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
        }}
      />
      <label htmlFor="language-toggle"></label>
      <span className="on">RU</span>
      <span className="off">EN</span>
    </div>
  );
};
