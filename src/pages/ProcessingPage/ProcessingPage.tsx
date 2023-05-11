import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RoundLoader } from '../../components/RoundLoader/RoundLoader';
import './ProcessingPage.scss';

export const ProcessingPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="processing-page-wrapper">
      <p className="authorizing-refresh-paragraph">{t('authorizationChecking')}</p>
      <RoundLoader />
    </div>
  );
};
