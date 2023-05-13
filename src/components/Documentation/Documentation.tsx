import { Suspense, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import { GraphQLDirective, GraphQLNamedType, GraphQLObjectType, buildSchema } from 'graphql';
import { GraphQLSchemaNormalizedConfig } from 'graphql/type/schema';

import { getGraphqlSchemaPrint } from '../../redux/slices/mainSlice';
import { RoundLoader } from '../RoundLoader/RoundLoader';
import { Nullable } from '../../types/types';
import './Documentation.scss';

export const Documentation = () => {
  const { t } = useTranslation();
  const graphqlSchemaPrint = useAppSelector(getGraphqlSchemaPrint);
  const [graphqlSchema, setGraphqlSchema] = useState<Nullable<GraphQLSchemaNormalizedConfig>>(null);
  const [schemaQueries, setSchemaQueries] = useState<Nullable<GraphQLObjectType>>(null);
  const [schemaMutations, setSchemaMutations] = useState<Nullable<GraphQLObjectType>>(null);
  const [schemaDirectives, setSchemaDirectives] =
    useState<Nullable<ReadonlyArray<GraphQLDirective>>>(null);
  const [schemaTypes, setSchemaTypes] = useState<Nullable<ReadonlyArray<GraphQLNamedType>>>(null);

  useEffect(() => {
    if (graphqlSchemaPrint) {
      setGraphqlSchema(buildSchema(graphqlSchemaPrint).toConfig());
    } else {
      setGraphqlSchema(null);
    }
  }, [graphqlSchemaPrint]);

  useEffect(() => {
    setSchemaQueries(graphqlSchema?.query ? graphqlSchema.query : null);
    setSchemaMutations(graphqlSchema?.mutation ? graphqlSchema.mutation : null);
    setSchemaTypes(graphqlSchema?.types ? graphqlSchema.types : null);
    setSchemaDirectives(graphqlSchema?.directives ? graphqlSchema.directives : null);
  }, [graphqlSchema]);
  return (
    <div className="docs-wrapper">
      <h1>{t('docs')}</h1>
      <Suspense fallback={<RoundLoader />}></Suspense>
    </div>
  );
};
