import { Dispatch, FC, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { ReactComponent as Documentation } from '../../assets/icons/document.svg';
import { ReactComponent as History } from '../../assets/icons/history.svg';
import { ReactComponent as Refetch } from '../../assets/icons/refetch.svg';
import { ReactComponent as Settings } from '../../assets/icons/setting.svg';
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
  isSidebarShown: boolean;
  setIsSidebarShown: Dispatch<SetStateAction<boolean>>;
}

export const SideBar: FC<Props> = ({ isSidebarShown, setIsSidebarShown }) => {
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
    if (!isSidebarShown && graphQlUrl) {
      dispatch(setGraphQlUrlSubmitted(graphQlUrl));
      setIsSidebarShown(true);
    } else {
      setIsSidebarShown(false);
      dispatch(setIsGraphqlSchemaReceived(false));
      dispatch(setCurrentSchemaType([]));
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
          title={isSidebarShown ? t('main.hideDoc') || '' : t('main.showDoc') || ''}
          onClick={openGraphqlSchema}
        >
          <Documentation
            title={isSidebarShown ? t('main.hideDoc') || '' : t('main.showDoc') || ''}
          />
        </button>
        <button type="button" className="icon-button" title={t('main.showHistory') || ''}>
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
        <button type="button" className="icon-button" title={t('main.showSetting') || ''}>
          <Settings title={t('main.showSetting') || ''} />
        </button>
      </div>
    </aside>
  );
};
