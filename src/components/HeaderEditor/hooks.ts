import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../redux/hooks';

import { setSystemMessage } from '../../redux/slices/mainSlice';
import { INewHeaderFormData } from './HeaderEditor';

type ExecutionType = 'checking' | 'execution';

export const useHeaderValidate = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (newHeader: INewHeaderFormData, type: ExecutionType): boolean => {
    if (!newHeader.headerName) {
      type === 'execution' &&
        dispatch(setSystemMessage({ message: `${t('enterHeaderNameCap')}`, severity: 'negative' }));
      return false;
    }
    if (newHeader.headerName.split(' ').length !== 1) {
      type === 'execution' &&
        dispatch(
          setSystemMessage({ message: `${t('enterCorrectHeaderNameCap')}`, severity: 'negative' })
        );
      return false;
    }
    if (!newHeader.headerValue) {
      type === 'execution' &&
        dispatch(
          setSystemMessage({ message: `${t('enterHeaderValueCap')}`, severity: 'negative' })
        );
      return false;
    }
    dispatch(setSystemMessage({ message: `${t('headerWasAdded')}`, severity: 'positive' }));
    return true;
  };
};
