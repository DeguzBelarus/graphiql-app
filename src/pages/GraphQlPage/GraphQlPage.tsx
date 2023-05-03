import { FC, useState } from 'react';

import './GraphQlPage.scss';
import { SideBar } from '../../components/SideBar/SideBar';
import { Documentation } from '../../components/Documentation/Documentation';
import { Graphiql } from '../../components/Graphiql/Graphiql';

export const GraphQlPage: FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);

  return (
    <div className="graphql-page-wrapper">
      <SideBar isSidebarShown={isSidebarShown} setIsSidebarShown={setIsSidebarShown} />
      {isSidebarShown && <Documentation />}
      <Graphiql />
    </div>
  );
};
