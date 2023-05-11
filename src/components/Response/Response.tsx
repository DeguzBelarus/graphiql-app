import { FC } from 'react';
import { useAppSelector } from '../../redux/hooks';

import { getGraphqlRequestStatus, getGraphqlResponse } from '../../redux/slices/mainSlice';
import { RoundLoader } from '../RoundLoader/RoundLoader';
import './Response.scss';

export const Response: FC = () => {
  const graphqlResponse = useAppSelector(getGraphqlResponse);
  const graphqlRequestStatus = useAppSelector(getGraphqlRequestStatus);
  return (
    <div className="response-wrapper">
      {graphqlRequestStatus === 'loading' ? <RoundLoader /> : null}
      {graphqlResponse ? <pre>{JSON.stringify(graphqlResponse, null, 2)}</pre> : null}
    </div>
  );
};
