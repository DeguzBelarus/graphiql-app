import { Dispatch, FC, SetStateAction } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';

import { ReactComponent as HistoryClearIcon } from '../../assets/icons/clean.svg';
import { getRequestsHistory, setRequestsHistory } from '../../redux/slices/mainSlice';
import { HistoryItem } from './components/HistoryItem/HistoryItem';
import './History.scss';

interface Props {
  setIsHistoryShown: Dispatch<SetStateAction<boolean>>;
}

export const History: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const requestsHistory = useAppSelector(getRequestsHistory);

  const clearHistory = () => {
    if (requestsHistory.length) {
      dispatch(setRequestsHistory([]));
    }
  };
  return (
    <div className="history-wrapper">
      <div className="upper-container">
        <h3>{`${t('historyCap')}`}</h3>
        {requestsHistory.length ? (
          <HistoryClearIcon title={t('main.cleanHistory') || ''} onClick={clearHistory} />
        ) : null}
      </div>
      <div className="history-items-wrapper">
        {requestsHistory.length ? (
          [...requestsHistory].reverse().map((historyItemData, index) => {
            return <HistoryItem data={historyItemData} key={index} id={index + 1} />;
          })
        ) : (
          <span>{`${t('emptyHistory')}`}</span>
        )}
      </div>
    </div>
  );
};
