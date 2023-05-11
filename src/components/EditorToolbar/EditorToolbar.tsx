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
} from '../../redux/slices/mainSlice';
import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as Copy } from '../../assets/icons/copy.svg';
import { sendGraphqlRequestAsync } from '../../redux/thunks';
import { validatorJSON } from '../VariablesEditor/utils';
import './EditorToolbar.scss';

export const EditorToolbar: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const graphQlUrl = useAppSelector(getGraphQlUrl);
  let graphQlQuery = useAppSelector(getGraphQlQuery);
  const graphQlResponse = useAppSelector(getGraphQlQuery);
  const variablesJSON = useAppSelector(getVariablesJSON);

  const sendGraphqlRequest = () => {
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
    dispatch(sendGraphqlRequestAsync({ endpoint: graphQlUrl, queryData: graphQlQuery }));
  };
  return (
    <div className="editor-toolbar-wrapper">
      <button
        type="button"
        className="icon-button-danger"
        title="Send request"
        onClick={sendGraphqlRequest}
      >
        <Play title="Execute query" />
      </button>
      <button type="button" className="icon-button" title="Copy query">
        <Copy title="Copy query" />
      </button>
    </div>
  );
};
