import { Dispatch, FC, SetStateAction, Suspense } from 'react';
import { useAppSelector } from '../../redux/hooks';

import { getGraphQlUrlSubmitted } from '../../redux/slices/mainSlice';
import { RoundLoader } from '../RoundLoader/RoundLoader';
import { GraphqlSchemaContent } from './components/GraphqlSchemaContent/GraphqlSchemaContent';
import { useRequestSchema } from '../../hooks/useRequestSchema';
import './Documentation.scss';

interface Props {
  setIsSidebarShown: Dispatch<SetStateAction<boolean>>;
}

export const Documentation: FC<Props> = ({ setIsSidebarShown }) => {
  const graphQlUrlSubmitted = useAppSelector(getGraphQlUrlSubmitted);
  const schemaReader = useRequestSchema(graphQlUrlSubmitted);

  return (
    <div className="docs-wrapper">
      <Suspense fallback={<RoundLoader />}>
        <GraphqlSchemaContent schemaReader={schemaReader()} setIsSidebarShown={setIsSidebarShown} />
      </Suspense>
    </div>
  );
};
