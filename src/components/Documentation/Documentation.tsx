import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';

import { getSchemaRequestStatus } from '../../redux/slices/mainSlice';
import { RoundLoader } from '../RoundLoader/RoundLoader';
import './Documentation.scss';

export const Documentation = () => {
  const { t } = useTranslation();
  const schemaRequestStatus = useAppSelector(getSchemaRequestStatus);

  return (
    <div className="docs-wrapper">
      {schemaRequestStatus === 'loading' ? (
        <>
          <h1>{t('docs')}</h1>
          <RoundLoader />
        </>
      ) : (
        <>
          <h1>{t('docs')}</h1>
          <div>{t('docsContent')}</div>
        </>
      )}
    </div>
  );
};
