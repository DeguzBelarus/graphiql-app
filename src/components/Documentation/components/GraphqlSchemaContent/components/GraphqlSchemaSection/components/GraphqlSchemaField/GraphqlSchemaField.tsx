import { GraphQLField } from 'graphql';
import { Dispatch, FC, SetStateAction } from 'react';

import { Nullable } from '../../../../../../../../types/types';
import './GraphqlSchemaField.scss';

type FieldType = 'query' | 'mutation';

interface Props {
  data: GraphQLField<unknown, unknown>;
  id: number;
  setCurrentQueryId?: Dispatch<SetStateAction<Nullable<number>>>;
  setCurrentMutationId?: Dispatch<SetStateAction<Nullable<number>>>;
  currentMutationId: Nullable<number>;
  currentQueryId: Nullable<number>;
  fieldType: FieldType;
}

export const GraphqlSchemaField: FC<Props> = ({
  data: { description, name },
  id,
  currentMutationId,
  currentQueryId,
  fieldType,
  setCurrentMutationId,
  setCurrentQueryId,
}) => {
  return (
    <div
      className="graphql-field-wrapper"
      onClick={
        fieldType === 'query' && setCurrentQueryId
          ? () => setCurrentQueryId(currentQueryId === id ? null : id)
          : fieldType === 'mutation' && setCurrentMutationId
          ? () => setCurrentMutationId(currentMutationId === id ? null : id)
          : undefined
      }
    >
      <span className="field-name-span">{`${id + 1}. ${name}`}</span>
      {description ? <p className="field-description-paragraph">{description}</p> : null}
    </div>
  );
};
