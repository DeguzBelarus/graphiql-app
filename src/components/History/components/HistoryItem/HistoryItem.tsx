import { FC } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';

import {
  setGraphQlQuery,
  setVariablesJSON,
  setCurrentRequestHeaders,
  setGraphQlUrl,
} from '../../../../redux/slices/mainSlice';
import { IHistoryRequestObject } from '../../../../redux/types';
import { ReactComponent as HistoryRestoreIcon } from '../../../../assets/icons/restore.svg';
import { validatorJSON } from '../../../VariablesEditor/utils';
import './HistoryItem.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  data: IHistoryRequestObject;
  id: number;
}

export const HistoryItem: FC<Props> = ({
  id,
  data: { currentRequestHeaders, graphQlUrl, query, variablesJSON },
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const historyRestore = () => {
    dispatch(setGraphQlUrl(graphQlUrl));
    dispatch(setVariablesJSON(variablesJSON));
    dispatch(setCurrentRequestHeaders(currentRequestHeaders));

    let operationName = '';
    if (query.split(' ').includes('query')) {
      operationName = query.split(' ')[1];
    }
    if (query.split(' ').includes('mutation')) {
      operationName = query.split(' ')[1];
    }

    dispatch(
      setGraphQlQuery(
        operationName
          ? {
              operationName,
              query,
              variables: validatorJSON(variablesJSON) ? JSON.parse(variablesJSON) : null,
            }
          : { query, variables: validatorJSON(variablesJSON) ? JSON.parse(variablesJSON) : null }
      )
    );
  };
  return (
    <div className="history-item-wrapper">
      <div className="history-item-content">
        <span>{`${id}.`}</span>
        <p className="query-paragraph">{query}</p>
      </div>
      <div className="history-item-button">
        <HistoryRestoreIcon title={t('main.restoreHistory') || ''} onClick={historyRestore} />
      </div>
    </div>
  );
};
