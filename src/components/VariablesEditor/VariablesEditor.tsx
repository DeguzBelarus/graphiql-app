import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { setVariablesJSON, getVariablesJSON } from '../../redux/slices/mainSlice';
import { Textarea } from '../Textarea/Textarea';
import { useTranslation } from 'react-i18next';
import './VariablesEditor.scss';

export const VariablesEditor: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const variablesJSON = useAppSelector(getVariablesJSON);

  const graphqlQueryUpdate = (value: string) => {
    dispatch(setVariablesJSON(value));
  };
  return (
    <div className="variables-editor">
      <Textarea
        value={variablesJSON}
        onValueChange={(value) => graphqlQueryUpdate(value)}
        numOfLines={1}
        placeholder={t('main.enterVariables')}
      />
    </div>
  );
};
