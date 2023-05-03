import React from 'react';
import i18n from 'i18next';

import './LanguagePicker.scss';

export const LanguagePicker = () => {
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="switch">
      <input
        id="language-toggle"
        className="check-toggle check-toggle-round-flat"
        type="checkbox"
      />
      <label
        htmlFor="language-toggle"
        onClick={() => {
          changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
        }}
      ></label>
      <span className="on">RU</span>
      <span className="off">EN</span>
    </div>
  );
};
