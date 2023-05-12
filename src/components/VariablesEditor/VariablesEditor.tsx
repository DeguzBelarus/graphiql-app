import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';

import { setVariablesJSON } from '../../redux/slices/mainSlice';
import './VariablesEditor.scss';
import { Textarea } from '../Textarea/Textarea';
import { useTranslation } from 'react-i18next';

export const VariablesEditor: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');

  const graphqlQueryUpdate = () => {
    dispatch(setVariablesJSON(value));
  };

  const updateRequest = (value: string) => {
    setValue(value);
    graphqlQueryUpdate();
  };

  return (
    <div className="variables-editor">
      <Textarea
        name="test-textarea"
        value={value}
        onValueChange={(value) => updateRequest(value)}
        numOfLines={1}
        placeholder={t('main.enterVariables')}
      />
    </div>
  );
};
