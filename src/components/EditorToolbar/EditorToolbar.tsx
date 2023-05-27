import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';

import {
  getGraphQlQuery,
  getGraphQlUrl,
  setGraphqlResponse,
  setSystemMessage,
  getVariablesJSON,
  setGraphQlQuery,
  getCurrentRequestHeaders,
  getRequestsHistory,
  setRequestsHistory,
} from '../../redux/slices/mainSlice';
import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as Copy } from '../../assets/icons/copy.svg';
import { sendGraphqlRequestAsync } from '../../redux/thunks';
import { validatorJSON } from '../VariablesEditor/utils';
import './EditorToolbar.scss';

export const EditorToolbar: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const graphQlUrl = useAppSelector(getGraphQlUrl);
  let graphQlQuery = useAppSelector(getGraphQlQuery);
  const graphQlResponse = useAppSelector(getGraphQlQuery);
  const variablesJSON = useAppSelector(getVariablesJSON);
  const headers = useAppSelector(getCurrentRequestHeaders);
  const requestsHistory = useAppSelector(getRequestsHistory);

  const sendGraphqlRequest = async () => {
    graphQlResponse && dispatch(setGraphqlResponse(null));
    if (!graphQlUrl) {
      dispatch(setSystemMessage({ message: `${t('enterRequestUrl')}`, severity: 'negative' }));
      return;
    }
    if (!graphQlQuery.query) {
      dispatch(setSystemMessage({ message: `${t('enterRequestQuery')}`, severity: 'negative' }));
      return;
    }
    if (variablesJSON) {
      if (!validatorJSON(variablesJSON)) {
        dispatch(
          setSystemMessage({ message: `${t('enterCorrectVariablesJSON')}`, severity: 'negative' })
        );
        return;
      } else {
        graphQlQuery = { ...graphQlQuery, variables: JSON.parse(variablesJSON) };
        dispatch(setGraphQlQuery(graphQlQuery));
      }
    }
    const { type } = await dispatch(
      sendGraphqlRequestAsync({ endpoint: graphQlUrl, queryData: graphQlQuery, headers })
    );
    if (type.split('/')[2] === 'fulfilled') {
      if (
        !requestsHistory.length ||
        requestsHistory[requestsHistory.length - 1].query !== graphQlQuery.query ||
        requestsHistory[requestsHistory.length - 1].graphQlUrl !== graphQlUrl ||
        requestsHistory[requestsHistory.length - 1].variablesJSON !== variablesJSON ||
        JSON.stringify(requestsHistory[requestsHistory.length - 1].currentRequestHeaders) !==
          JSON.stringify(headers)
      ) {
        dispatch(
          setRequestsHistory([
            ...requestsHistory,
            {
              graphQlUrl,
              query: graphQlQuery.query,
              variablesJSON,
              currentRequestHeaders: headers,
              creationDateStamp: Date.now(),
            },
          ])
        );
      }
    }
  };

  const copyQuery = () => {
    navigator.clipboard.writeText(graphQlQuery.query);
    dispatch(setSystemMessage({ message: `${t('main.copiedQuery')}`, severity: 'positive' }));
  };

  return (
    <div className="editor-toolbar-wrapper">
      <button
        type="button"
        className="icon-button-danger"
        title={t('main.executeQuery') || ''}
        onClick={sendGraphqlRequest}
      >
        <Play title={t('main.executeQuery') || ''} />
      </button>
      <button
        type="button"
        className="icon-button"
        disabled={!graphQlQuery.query}
        title={t('main.copyQuery') || ''}
        onClick={copyQuery}
      >
        <Copy title={t('main.copyQuery') || ''} />
      </button>
    </div>
  );
};
