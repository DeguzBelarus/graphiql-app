import { FC } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';

import {
  setGraphQlQuery,
  setVariablesJSON,
  setCurrentRequestHeaders,
  setGraphQlUrl,
} from '../../../../redux/slices/mainSlice';
import { IHistoryRequestObject } from '../../../../redux/types';
import historyRestoreIcon from '../../../../assets/images/history-restore.png';
import { validatorJSON } from '../../../VariablesEditor/utils';
import './HistoryItem.scss';

interface Props {
  data: IHistoryRequestObject;
  id: number;
}

export const HistoryItem: FC<Props> = ({
  id,
  data: { currentRequestHeaders, graphQlUrl, query, variablesJSON },
}) => {
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
      <span>{`${id}.`}</span>
      <span className="query-span">{`${query.slice(0, 25)}...`}</span>
      <img
        className="history-restore-icon"
        src={historyRestoreIcon}
        alt="restore icon"
        onClick={historyRestore}
      />
    </div>
  );
};
