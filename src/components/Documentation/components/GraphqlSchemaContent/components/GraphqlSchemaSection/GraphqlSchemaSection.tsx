import { FC, useState } from 'react';

import { Nullable } from '../../../../../../types/types';
import { GraphQLObjectType } from 'graphql';
import { GraphqlSchemaField } from './components/GraphqlSchemaField/GraphqlSchemaField';
import './GraphqlSchemaSection.scss';

type GraphqlSchemaSectionType = 'query' | 'mutation';

interface Props {
  type: GraphqlSchemaSectionType;
  graphQLObjectType: Nullable<GraphQLObjectType>;
}

export const GraphqlSchemaSection: FC<Props> = ({ graphQLObjectType, type }) => {
  const [currentQueryId, setCurrentQueryId] = useState<Nullable<number>>(null);
  const [currentMutationId, setCurrentMutationId] = useState<Nullable<number>>(null);
  return (
    <div className="graphql-section-wrapper">
      {graphQLObjectType ? (
        <>
          <h5 className="graphql-section-heading">{`${type === 'query' ? 'Query: ' : 'Mutation: '}${
            graphQLObjectType?.name
          }`}</h5>
          {Object.values(graphQLObjectType.getFields()).map((graphQLField, index) => {
            return (
              <GraphqlSchemaField
                id={index}
                key={index}
                data={graphQLField}
                currentQueryId={currentQueryId}
                currentMutationId={currentMutationId}
                setCurrentQueryId={type === 'query' ? setCurrentQueryId : undefined}
                setCurrentMutationId={type === 'mutation' ? setCurrentMutationId : undefined}
                fieldType={type === 'mutation' ? 'mutation' : 'query'}
              />
            );
          })}
        </>
      ) : null}

      {!graphQLObjectType ? (
        <span className="no-data-span">
          {type === 'mutation' ? 'There are no mutations' : 'There are no queries'}
        </span>
      ) : null}
    </div>
  );
};
