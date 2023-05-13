import { FC, useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';

import { SideBar } from '../../components/SideBar/SideBar';
import { Documentation } from '../../components/Documentation/Documentation';
import { Graphiql } from '../../components/Graphiql/Graphiql';
import { getGraphqlSchemaPrint, getSchemaRequestStatus } from '../../redux/slices/mainSlice';
import './GraphQlPage.scss';

export const GraphQlPage: FC = () => {
  const graphqlSchemaPrint = useAppSelector(getGraphqlSchemaPrint);
  const schemaRequestStatus = useAppSelector(getSchemaRequestStatus);

  const [isSidebarShown, setIsSidebarShown] = useState(false);

  useEffect(() => {
    if (graphqlSchemaPrint || schemaRequestStatus === 'loading') {
      setIsSidebarShown(true);
    } else {
      if (isSidebarShown) {
        setIsSidebarShown(false);
      }
    }
  }, [graphqlSchemaPrint, isSidebarShown, schemaRequestStatus]);
  return (
    <div className="graphql-page-wrapper">
      <SideBar isSidebarShown={isSidebarShown} />
      {isSidebarShown && <Documentation />}
      <Graphiql />
    </div>
  );
};
