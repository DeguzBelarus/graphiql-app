import { FC, useState } from 'react';

import { SideBar } from '../../components/SideBar/SideBar';
import { Documentation } from '../../components/Documentation/Documentation';
import { History } from '../../components/History/History';
import { Graphiql } from '../../components/Graphiql/Graphiql';
import './GraphQlPage.scss';

export const GraphQlPage: FC = () => {
  const [isDocsShown, setIsDocsShown] = useState(false);
  const [isHistoryShown, setIsHistoryShown] = useState(false);
  return (
    <div className="graphql-page-wrapper">
      <SideBar
        isDocsShown={isDocsShown}
        setIsDocsShown={setIsDocsShown}
        setIsHistoryShown={setIsHistoryShown}
        isHistoryShown={isHistoryShown}
      />
      {isDocsShown && !isHistoryShown ? <Documentation setIsDocsShown={setIsDocsShown} /> : null}
      {!isDocsShown && isHistoryShown ? <History setIsHistoryShown={setIsHistoryShown} /> : null}
      <Graphiql />
    </div>
  );
};
