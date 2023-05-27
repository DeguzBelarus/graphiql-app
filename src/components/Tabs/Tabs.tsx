import { useState } from 'react';

import { VariablesEditor } from '../VariablesEditor/VariablesEditor';
import { HeaderEditor } from '../HeaderEditor/HeaderEditor';
import { ReactComponent as Show } from '../../assets/icons/show.svg';
import { ReactComponent as Hide } from '../../assets/icons/hide.svg';
import { useTranslation } from 'react-i18next';
import './Tabs.scss';

interface TabsProps {
  isTabsOpen: boolean;
  setIsTabsOpen: (isTabsOpen: boolean) => void;
}

export const Tabs = ({ isTabsOpen, setIsTabsOpen }: TabsProps) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('tab1');

  const handleTab1 = () => {
    setActiveTab('tab1');
    setIsTabsOpen(true);
  };
  const handleTab2 = () => {
    setActiveTab('tab2');
    setIsTabsOpen(true);
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
      <div className="tabs-content">
        {activeTab === 'tab1' ? <VariablesEditor /> : <HeaderEditor />}
      </div>
    </div>
  );
};
