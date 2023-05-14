import React, { useState } from 'react';
import './Tabs.scss';
import { VariablesEditor } from '../VariablesEditor/VariablesEditor';
import { HeaderEditor } from '../HeaderEditor/HeaderEditor';
import { ReactComponent as Show } from '../../assets/icons/show.svg';
import { ReactComponent as Hide } from '../../assets/icons/hide.svg';
import { useTranslation } from 'react-i18next';

export const Tabs = () => {
  const { t } = useTranslation();

  const [isTabsOpen, setIsTabsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTab1 = () => {
    setActiveTab('tab1');
  };
  const handleTab2 = () => {
    setActiveTab('tab2');
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header-container">
        <ul className="nav">
          <li className={activeTab === 'tab1' ? 'active' : ''} onClick={handleTab1}>
            {t('main.variables')}
          </li>
          <li className={activeTab === 'tab2' ? 'active' : ''} onClick={handleTab2}>
            {t('main.headers')}
          </li>
        </ul>
        <button className="small-icon-button" onClick={() => setIsTabsOpen(!isTabsOpen)}>
          {isTabsOpen ? <Hide /> : <Show />}
        </button>
      </div>
      <div>{activeTab === 'tab1' ? <VariablesEditor /> : <HeaderEditor />}</div>
    </div>
  );
};
