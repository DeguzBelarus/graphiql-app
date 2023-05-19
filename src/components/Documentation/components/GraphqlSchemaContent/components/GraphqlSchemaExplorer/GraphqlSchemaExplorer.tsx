import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/hooks';
import { GraphQLSchema } from 'graphql';
import { useTranslation } from 'react-i18next';

import {
  getCurrentSchemaType,
  setCurrentSchemaType,
} from '../../../../../../redux/slices/mainSlice';
import { GraphqlSchemaField } from '../GraphqlSchemaSection/components/GraphqlSchemaField/GraphqlSchemaField';
import { getTypeFields } from '../../../../utils';
import './GraphqlSchemaExplorer.scss';

interface Props {
  schema: GraphQLSchema;
}

export const GraphqlSchemaExplorer: FC<Props> = ({ schema }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentSchemaTypeName = useAppSelector(getCurrentSchemaType);
  const currentSchemaTypeData = schema.getType(
    currentSchemaTypeName[currentSchemaTypeName.length - 1] || ''
  );
  const fields = getTypeFields(currentSchemaTypeData || {});
  return (
    <div className="graphql-schema-explorer-wrapper">
      <div className="upper-container">
        {currentSchemaTypeName.length > 1 ? (
          <button
            type="button"
            className="icon-button"
            onClick={() =>
              dispatch(
                setCurrentSchemaType(
                  currentSchemaTypeName.slice(0, currentSchemaTypeName.length - 1)
                )
              )
            }
          >
            back
          </button>
        ) : null}
        <button
          type="button"
          className="icon-button"
          onClick={() => dispatch(setCurrentSchemaType([]))}
        >
          &times;
        </button>
      </div>
      <div className="content-container">
        <span className="current-type-name-span">
          {currentSchemaTypeName[currentSchemaTypeName.length - 1]}
        </span>
        <span className="description">
          {currentSchemaTypeData?.description || `${t('noDescriptionProvided')}`}
        </span>
        {fields.length ? (
          <div className="fields-container">
            <span className="fields-span">{`${t('fields')}:`}</span>
            {fields.map((typeField, index) => {
              return <GraphqlSchemaField data={typeField} id={index} key={index} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};
