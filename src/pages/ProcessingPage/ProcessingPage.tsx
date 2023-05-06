import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import './ProcessingPage.scss';

export const ProcessingPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="processing-page-wrapper">
      <p className="authorizing-refresh-paragraph">{t('authorizationChecking')}</p>
      <span className="loader"></span>
    </div>
  );
};
