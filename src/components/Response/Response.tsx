import { FC } from 'react';
import { useAppSelector } from '../../redux/hooks';

import { getGraphqlRequestStatus, getGraphqlResponse } from '../../redux/slices/mainSlice';
import { RoundLoader } from '../RoundLoader/RoundLoader';
import './Response.scss';
import { useTranslation } from 'react-i18next';

export const Response: FC = () => {
  const { t } = useTranslation();

  const graphqlResponse = useAppSelector(getGraphqlResponse);
  const graphqlRequestStatus = useAppSelector(getGraphqlRequestStatus);
  return (
    <div className="response-wrapper">
      {graphqlResponse ? (
        <pre>{JSON.stringify(graphqlResponse, null, 2)}</pre>
      ) : graphqlRequestStatus === 'loading' ? (
        <RoundLoader />
      ) : (
        <pre className="placeholder-text">{t('main.graphiqlResponse')}</pre>
      )}
    </div>
  );
};
