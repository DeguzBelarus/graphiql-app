import React from 'react';
import './LanguagePicker.scss';
export const LanguagePicker = () => {
  return (
    <div className="switch">
      <input
        id="language-toggle"
        className="check-toggle check-toggle-round-flat"
        type="checkbox"
      />
      <label htmlFor="language-toggle"></label>
      <span className="on">RU</span>
      <span className="off">EN</span>
    </div>
  );
};
