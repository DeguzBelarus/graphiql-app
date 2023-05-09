import { FC, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { getGraphQlUrl, setGraphQlUrl } from '../../redux/slices/mainSlice';
import './GraphQlEndpoint.scss';

export const GraphQlEndpoint: FC = () => {
  const graphqlEndpointInput = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const graphQlUrl = useAppSelector(getGraphQlUrl);
  return (
    <div className="graphql-endpoint-wrapper">
      <input
        type="text"
        id="graphql-endpoint-input"
        placeholder="Enter URL to make a request"
        value={graphQlUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setGraphQlUrl(event.target.value))
        }
        ref={graphqlEndpointInput}
      />
    </div>
  );
};
