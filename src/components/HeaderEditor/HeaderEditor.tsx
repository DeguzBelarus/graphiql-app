import { FC, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';

import {
  setCurrentRequestHeaders,
  getCurrentRequestHeaders,
  setSystemMessage,
} from '../../redux/slices/mainSlice';
import { EMPTY_NEW_HEADER_FORM_DATA } from './constants';
import { Input } from '../Input/Input';
import { useHeaderValidate } from './hooks';
import './HeaderEditor.scss';
import { AppliedHeaderItem } from './components/AppliedHeaderItem/AppliedHeaderItem';

export interface INewHeaderFormData {
  headerName: string;
  headerValue: string;
}

export type HeaderEntryArray = [string, string];

export const HeaderEditor: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const newHeaderValidate = useHeaderValidate();
  const currentRequestHeaders = useAppSelector(getCurrentRequestHeaders);

  const [headerFormData, setHeaderFormData] = useState<INewHeaderFormData>(
    EMPTY_NEW_HEADER_FORM_DATA
  );

  const currentHeadersEntries = Object.entries(currentRequestHeaders) as Array<HeaderEntryArray>;

  const headerFormDataReset = () => {
    setHeaderFormData(EMPTY_NEW_HEADER_FORM_DATA);
  };

  const addNewHeader = () => {
    if (newHeaderValidate(headerFormData, 'execution')) {
      dispatch(
        setCurrentRequestHeaders({
          ...currentRequestHeaders,
          [headerFormData.headerName]: headerFormData.headerValue,
        })
      );
      headerFormDataReset();
      dispatch(setSystemMessage({ message: `${t('headerWasAdded')}`, severity: 'positive' }));
    }
  };
  return (
    <div className="header-editor">
      <div className="header-inputs-container">
        <Input
          type="header-name"
          value={headerFormData.headerName}
          setValue={(event: React.ChangeEvent<HTMLInputElement>) =>
            setHeaderFormData({ ...headerFormData, headerName: event.target.value })
          }
        />
        <Input
          type="header-value"
          value={headerFormData.headerValue}
          setValue={(event: React.ChangeEvent<HTMLInputElement>) =>
            setHeaderFormData({ ...headerFormData, headerValue: event.target.value })
          }
        />
        <button
          type="button"
          className="icon-button"
          disabled={!newHeaderValidate(headerFormData, 'checking')}
          onClick={addNewHeader}
        >
          +
        </button>
      </div>
      <div className="applied-headers-container">
        {currentHeadersEntries.map((headerEntry, index) => {
          return <AppliedHeaderItem headerData={headerEntry} id={index} key={index} />;
        })}
      </div>
    </div>
  );
};
