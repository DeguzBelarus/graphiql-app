import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from '../store';

import { CurrentLanguageType } from '../../types/types';
import { MainState } from '../types';

const initialState: MainState = {
  currentLanguage: 'en',
  isFirstLoad: true,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCurrentLanguage(
      state: WritableDraft<MainState>,
      { payload }: PayloadAction<CurrentLanguageType>
    ) {
      state.currentLanguage = payload;
    },
    setIsFirstLoad(state: WritableDraft<MainState>, { payload }: PayloadAction<boolean>) {
      state.isFirstLoad = payload;
    },
  },
});

export const {
  actions: { setCurrentLanguage, setIsFirstLoad },
} = mainSlice;

export const getCurrentLanguage = ({ main: { currentLanguage } }: RootState) => currentLanguage;
export const getIsFirstLoad = ({ main: { isFirstLoad } }: RootState) => isFirstLoad;

export const { reducer } = mainSlice;
