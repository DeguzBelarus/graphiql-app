import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../../../../../redux/hooks';
import { GraphQLArgument } from 'graphql';

import { getTypeName } from '../../../../../../../utils';
import {
  getCurrentSchemaType,
  setCurrentSchemaType,
} from '../../../../../../../../../redux/slices/mainSlice';
import './GraphqlSchemaArgument.scss';

interface Props {
  data: GraphQLArgument;
}

export const GraphqlSchemaArgument: FC<Props> = ({ data: { name, type } }) => {
  const dispatch = useAppDispatch();
  const currentSchemaType = useAppSelector(getCurrentSchemaType);
  return (
    <div className="graphql-argument-wrapper">
      <p>
        <span>{`${name}: `}</span>
        <span
          className="type"
          onClick={() => dispatch(setCurrentSchemaType([...currentSchemaType, getTypeName(type)]))}
        >
          {getTypeName(type)}
        </span>
      </p>
    </div>
  );
};
