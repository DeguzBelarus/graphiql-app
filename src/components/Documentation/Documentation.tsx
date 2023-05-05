import React from 'react';
import { useTranslation } from 'react-i18next';

import './Documentation.scss';

export const Documentation = () => {
  const { t } = useTranslation();

  return (
    <div className="docs-wrapper">
      <h1>{t('docs')}</h1>
      <div>{t('docsContent')}</div>
    </div>
  );
};
