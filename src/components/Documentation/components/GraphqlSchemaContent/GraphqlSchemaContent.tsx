import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { GraphQLSchema } from 'graphql';
import { useTranslation } from 'react-i18next';

import { Undefinable } from '../../../../types/types';
import {
  setIsGraphqlSchemaReceived,
  getCurrentSchemaType,
} from '../../../../redux/slices/mainSlice';
import { GraphqlSchemaSection } from './components/GraphqlSchemaSection/GraphqlSchemaSection';
import { GraphqlSchemaExplorer } from './components/GraphqlSchemaExplorer/GraphqlSchemaExplorer';
import './GraphqlSchemaContent.scss';

interface Props {
  schemaReader: { read(): Undefinable<GraphQLSchema> };
  setIsSidebarShown: Dispatch<SetStateAction<boolean>>;
}

export const GraphqlSchemaContent: FC<Props> = ({ schemaReader, setIsSidebarShown }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const schema = schemaReader.read();

  const currentSchemaTypeName = useAppSelector(getCurrentSchemaType);

  useEffect(() => {
    if (!schema) {
      setIsSidebarShown(false);
    } else {
      dispatch(setIsGraphqlSchemaReceived(true));
    }
  }, [dispatch, schema, setIsSidebarShown]);
  return (
    <div className="graphql-schema-content-wrapper">
      <h3>{t('docs')}</h3>
      {schema ? (
        !currentSchemaTypeName.length ? (
          <>
            <GraphqlSchemaSection
              type="mutation"
              graphQLObjectType={schema.getMutationType() || null}
            />
            <GraphqlSchemaSection type="query" graphQLObjectType={schema.getQueryType() || null} />
          </>
        ) : (
          <GraphqlSchemaExplorer schema={schema} />
        )
      ) : null}
    </div>
  );
};
