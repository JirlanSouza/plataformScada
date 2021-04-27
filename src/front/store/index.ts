import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { dialogObjectProptiesEditReducer } from './diologObjectProptiesEdit';
import { editorReducer } from './Editor';

import { screensReducer } from './screens';

const store = configureStore({
  reducer: {
    screens: screensReducer,
    editor: editorReducer,
    dilogObjectProptiesEdit: dialogObjectProptiesEditReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
