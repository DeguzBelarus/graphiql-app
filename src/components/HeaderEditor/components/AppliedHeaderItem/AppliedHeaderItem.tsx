import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

import {
  setCurrentRequestHeaders,
  getCurrentRequestHeaders,
} from '../../../../redux/slices/mainSlice';
import { HeaderEntryArray } from '../../HeaderEditor';
import { CONTENT_TYPE_HEADER_NAME } from './constants';
import './AppliedHeaderItem.scss';

interface Props {
  id: number;
  headerData: HeaderEntryArray;
}

export const AppliedHeaderItem: FC<Props> = ({ headerData }) => {
  const dispatch = useAppDispatch();
  const currentRequestHeaders = { ...useAppSelector(getCurrentRequestHeaders) };

  const [headerName, headerValue] = headerData;

  const removeHeader = () => {
    delete currentRequestHeaders[headerName as keyof HeadersInit];
    dispatch(setCurrentRequestHeaders(currentRequestHeaders));
  };
  return (
    <div className="applied-header-item-wrapper">
      <span>{`${headerName}: ${headerValue}`}</span>
      {headerName !== CONTENT_TYPE_HEADER_NAME ? (
        <button type="button" className="icon-button remove-header-button" onClick={removeHeader}>
          -
        </button>
      ) : null}
    </div>
  );
};
