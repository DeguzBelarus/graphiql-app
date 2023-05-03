import React from 'react';
import './SideBar.scss';
import { ReactComponent as Documentation } from '../../assets/icons/document.svg';
import { ReactComponent as History } from '../../assets/icons/history.svg';
import { ReactComponent as Refetch } from '../../assets/icons/refetch.svg';
import { ReactComponent as Settings } from '../../assets/icons/setting.svg';

interface SideBarProps {
  isSidebarShown: boolean;
  setIsSidebarShown: (isSidebarShown: boolean) => void;
}
export const SideBar = ({ isSidebarShown, setIsSidebarShown }: SideBarProps) => {
  return (
    <aside>
      <div className="sidebar-buttons-wrapper">
        <button className="icon-button" onClick={() => setIsSidebarShown(!isSidebarShown)}>
          <Documentation
            title={isSidebarShown ? 'Hide Documentation Explorer' : 'Show Documentation Explorer'}
          />
        </button>
        <button className="icon-button">
          <History title="Show History" />
        </button>
      </div>

      <div className="sidebar-buttons-wrapper">
        <button className="icon-button">
          <Refetch title="Re-fetch GraphQL schema" />
        </button>
        <button className="icon-button">
          <Settings title="Show Setting" />
        </button>
      </div>
    </aside>
  );
};
