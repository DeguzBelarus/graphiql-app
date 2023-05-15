import { FC, useState } from 'react';

import { SideBar } from '../../components/SideBar/SideBar';
import { Documentation } from '../../components/Documentation/Documentation';
import { Graphiql } from '../../components/Graphiql/Graphiql';
import './GraphQlPage.scss';

export const GraphQlPage: FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  return (
    <div className="graphql-page-wrapper">
      <SideBar isSidebarShown={isSidebarShown} setIsSidebarShown={setIsSidebarShown} />
      {isSidebarShown ? <Documentation setIsSidebarShown={setIsSidebarShown} /> : null}
      <Graphiql />
    </div>
  );
};
