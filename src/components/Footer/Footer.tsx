import { FC } from 'react';
import Logo from './../../assets/images/rs_school_js.svg';
import './Footer.scss';

import { TeamMembersData } from '../../assets/data/members';
export const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-container">
      <a href="https://rs.school/react/" target="_blank" rel="noreferrer noopener">
        <img src={Logo} alt="github-logo" />
      </a>
      <div className="member-list">
        {TeamMembersData.map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noreferrer">
            <p>{item.username}</p>
          </a>
        ))}
      </div>
      <div>© {year}</div>
    </footer>
  );
};
