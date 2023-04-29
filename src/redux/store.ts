import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as mainReducer } from './slices/mainSlice';
import { reducer as userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
