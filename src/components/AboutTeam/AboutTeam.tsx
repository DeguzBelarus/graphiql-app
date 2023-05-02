import React from 'react';
import { TeamMembersData } from '../../assets/data/members';

import './AboutTeam.scss';

const AboutTeam = () => {
  return (
    <section className="team">
      <div className="team__wrapper">
        <h2 className="team__title">Our Team</h2>
        <ul className="team-member__wrapper">
          {TeamMembersData.map((item) => (
            <li
              className="team-member__item"
              key={item.id}
              onClick={() => (window.location.href = item.url)}
            >
              <div className="team-member__image">
                <img src={item.imageSrc} alt={item.name} />
              </div>
              <div className="team-member__content">
                <h4 className="team-member__title">{item.name}</h4>
                <p className="team-member__role">{item.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutTeam;
