import { Dispatch, FC, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { ReactComponent as Documentation } from '../../assets/icons/document.svg';
import { ReactComponent as History } from '../../assets/icons/history.svg';
import { ReactComponent as Refetch } from '../../assets/icons/refetch.svg';
import {
  getGraphQlUrl,
  setGraphQlUrlSubmitted,
  getIsGraphqlSchemaReceived,
  setIsGraphqlSchemaReceived,
  getGraphQlUrlSubmitted,
  setSystemMessage,
  setCurrentSchemaType,
} from '../../redux/slices/mainSlice';
import { useTranslation } from 'react-i18next';
import './SideBar.scss';

interface Props {
  isDocsShown: boolean;
  isHistoryShown: boolean;
  setIsDocsShown: Dispatch<SetStateAction<boolean>>;
  setIsHistoryShown: Dispatch<SetStateAction<boolean>>;
}

export const SideBar: FC<Props> = ({
  isDocsShown,
  setIsDocsShown,
  setIsHistoryShown,
  isHistoryShown,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const graphQlUrl = useAppSelector(getGraphQlUrl);
  const graphQlUrlSubmitted = useAppSelector(getGraphQlUrlSubmitted);
  const isGraphqlSchemaReceived = useAppSelector(getIsGraphqlSchemaReceived);

  const openGraphqlSchema = () => {
    if (!graphQlUrl) {
      dispatch(
        setSystemMessage({ message: `${t('enterRequestSchemaUrl')}`, severity: 'negative' })
      );
    }
    if (!isDocsShown && graphQlUrl) {
      dispatch(setGraphQlUrlSubmitted(graphQlUrl));
      setIsDocsShown(true);
      if (isHistoryShown) {
        setIsHistoryShown(false);
      }
    } else {
      setIsDocsShown(false);
      dispatch(setIsGraphqlSchemaReceived(false));
      dispatch(setCurrentSchemaType([]));
    }
  };

  const openRequestsHistory = () => {
    if (isHistoryShown) {
      setIsHistoryShown(false);
    } else {
      setIsHistoryShown(true);
      if (isDocsShown) {
        setIsDocsShown(false);
      }
    }
  };

  const refreshGraphqlSchema = () => {
    if (!graphQlUrl) {
      dispatch(
        setSystemMessage({ message: `${t('enterRequestSchemaUrl')}`, severity: 'negative' })
      );
    } else {
      dispatch(setGraphQlUrlSubmitted(graphQlUrl));
    }
  };
  return (
    <aside>
      <div className="sidebar-buttons-wrapper">
        <button
          type="button"
          className="icon-button"
          title={isDocsShown ? t('main.hideDoc') || '' : t('main.showDoc') || ''}
          onClick={openGraphqlSchema}
        >
          <Documentation title={isDocsShown ? t('main.hideDoc') || '' : t('main.showDoc') || ''} />
        </button>
        <button
          type="button"
          className="icon-button"
          title={t('main.showHistory') || ''}
          onClick={openRequestsHistory}
        >
          <History title={t('main.showHistory') || ''} />
        </button>
      </div>

      <div className="sidebar-buttons-wrapper">
        {isGraphqlSchemaReceived && graphQlUrlSubmitted !== graphQlUrl ? (
          <button
            type="button"
            className="icon-button"
            onClick={refreshGraphqlSchema}
            title={t('main.reFetchSchema') || ''}
          >
            <Refetch title={t('main.reFetchSchema') || ''} />
          </button>
        ) : null}
      </div>
    </aside>
  );
};
