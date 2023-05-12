import { FC, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { getGraphQlUrl, setGraphQlUrl } from '../../redux/slices/mainSlice';
import './GraphQlEndpoint.scss';
import { useTranslation } from 'react-i18next';

export const GraphQlEndpoint: FC = () => {
  const { t } = useTranslation();

  const graphqlEndpointInput = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const graphQlUrl = useAppSelector(getGraphQlUrl);
  return (
    <div className="graphql-endpoint-wrapper">
      <input
        type="text"
        id="graphql-endpoint-input"
        placeholder={t('main.enterUrl') || ''}
        value={graphQlUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setGraphQlUrl(event.target.value))
        }
        ref={graphqlEndpointInput}
      />
    </div>
  );
};
