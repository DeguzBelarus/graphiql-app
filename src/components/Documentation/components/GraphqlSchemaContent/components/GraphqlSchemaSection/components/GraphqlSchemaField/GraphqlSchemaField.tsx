import { Dispatch, FC, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../../redux/hooks';
import { GraphQLField } from 'graphql';

import expandIcon from '../../../../../../../../assets/icons/show.svg';
import {
  setCurrentSchemaType,
  getCurrentSchemaType,
} from '../../../../../../../../redux/slices/mainSlice';
import { Nullable } from '../../../../../../../../types/types';
import { getTypeName } from '../../../../../../utils';
import { GraphqlSchemaArgument } from './GraphqlSchemaArgument/GraphqlSchemaArgument';
import './GraphqlSchemaField.scss';

type FieldType = 'query' | 'mutation';

interface Props {
  data: GraphQLField<unknown, unknown>;
  id: number;
  setCurrentQueryId?: Dispatch<SetStateAction<Nullable<number>>>;
  setCurrentMutationId?: Dispatch<SetStateAction<Nullable<number>>>;
  currentMutationId?: Nullable<number>;
  currentQueryId?: Nullable<number>;
  fieldType?: FieldType;
}

export const GraphqlSchemaField: FC<Props> = ({
  data: { description, name, args, type },
  id,
  currentMutationId,
  currentQueryId,
  fieldType,
  setCurrentMutationId,
  setCurrentQueryId,
}) => {
  const dispatch = useAppDispatch();

  const currentSchemaType = useAppSelector(getCurrentSchemaType);
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
      <p>
        <span className="field-name-span">{`${id + 1}. ${name}: `}</span>
        <span
          className="field-name-span type"
          onClick={() => dispatch(setCurrentSchemaType([...currentSchemaType, getTypeName(type)]))}
        >{`${getTypeName(type)}`}</span>
      </p>
      {description ? <p className="field-description-paragraph">{description}</p> : null}
      {args?.length ? (
        fieldType === 'query' ? (
          <img
            src={expandIcon}
            alt="expand arrow icon"
            className={id === currentQueryId ? 'expand-logo open' : 'expand-logo'}
          />
        ) : (
          <img
            src={expandIcon}
            alt="expand arrow icon"
            className={id === currentMutationId ? 'expand-logo open' : 'expand-logo'}
          />
        )
      ) : null}
      {(args?.length && fieldType === 'query' && currentQueryId === id) ||
      (fieldType === 'mutation' && currentMutationId === id) ? (
        <div className="arguments-container">
          <span>arguments:</span>
          {args.map((argument, index) => {
            return <GraphqlSchemaArgument data={argument} key={index} />;
          })}
        </div>
      ) : null}
    </div>
  );
};
