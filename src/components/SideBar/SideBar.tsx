import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { ReactComponent as Documentation } from '../../assets/icons/document.svg';
import { ReactComponent as History } from '../../assets/icons/history.svg';
import { ReactComponent as Refetch } from '../../assets/icons/refetch.svg';
import { ReactComponent as Settings } from '../../assets/icons/setting.svg';
import { getGraphqlSchemaAsync } from '../../redux/thunks';
import {
  getGraphQlUrl,
  setGraphqlSchemaJSON,
  setSystemMessage,
  getGraphqlSchemaJSON,
} from '../../redux/slices/mainSlice';
import { useTranslation } from 'react-i18next';
import './SideBar.scss';

interface Props {
  isSidebarShown: boolean;
}
export const SideBar = ({ isSidebarShown }: Props) => {
  const { t } = useTranslation();


export const SideBar: FC<Props> = ({ isSidebarShown }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const graphQlUrl = useAppSelector(getGraphQlUrl);
  const graphqlSchemaJSON = useAppSelector(getGraphqlSchemaJSON);

  const getGraphqlSchema = () => {
    if (!graphQlUrl) {
      dispatch(
        setSystemMessage({ message: `${t('enterRequestSchemaUrl')}`, severity: 'negative' })
      );
      return;
    }
    dispatch(getGraphqlSchemaAsync(graphQlUrl));
  };

  const openGraphqlSchema = () => {
    if (graphqlSchemaJSON) {
      dispatch(setGraphqlSchemaJSON(null));
    } else {
      getGraphqlSchema();
    }
  };

  const refreshGraphqlSchema = () => {
    if (graphqlSchemaJSON) {
      getGraphqlSchema();
    }
  };
  return (
    <aside>
      <div className="sidebar-buttons-wrapper">
        <button type="button" className="icon-button" onClick={openGraphqlSchema}>
          <Documentation
            title={isSidebarShown ? t('main.hideDoc') || '' : t('main.showDoc') || ''}
          />
        </button>
        <button type="button" className="icon-button">
          <History title={t('main.showHistory') || ''} />
        </button>
      </div>

      <div className="sidebar-buttons-wrapper">
        {graphqlSchemaJSON ? (
          <button type="button" className="icon-button" onClick={refreshGraphqlSchema}>
          <Refetch title={t('main.reFetchSchema') || ''} />
        </button>
        ) : null}
        <button type="button" className="icon-button">
          <Settings title={t('main.showSetting') || ''} />
        </button>
      </div>
    </aside>
  );
};
