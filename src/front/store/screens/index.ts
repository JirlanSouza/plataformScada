import { createSlice } from '@reduxjs/toolkit';

import { IObject } from '../../core/object';
import {
  addObject,
  manipulateObject,
  editObject,
  removeObject,
  selectObject,
  unSelectObject,
  editingProptiesObject,
  unEditingProptiesObject,
} from './Objects';

interface ObjectsState {
  hasObjectsSelecteds: boolean;
  hasObjectsEditingsPropties: boolean;
  items: IObject[];
}

export interface ScreenState {
  id: number;
  name: string;
  isStartScreen: boolean;
  size: {
    width: number;
    height: number;
  };
  objects: ObjectsState;
}

export type ScreensState = ScreenState[];

export const ScreensSlice = createSlice({
  name: 'screens',
  initialState: [
    {
      id: 0,
      name: 'home',
      isStartScreen: false,
      size: {
        width: 1366,
        height: 768,
      },
      objects: {
        hasObjectsSelecteds: false,
        hasObjectsEditingsPropties: false,
        items: [] as IObject[],
      },
    },
  ] as ScreensState,
  reducers: {
    addObject,
    manipulateObject,
    editObject,
    removeObject,
    selectObject,
    unSelectObject,
    editingProptiesObject,
    unEditingProptiesObject,
  },
});

export const screenActions = ScreensSlice.actions;
export const screensReducer = ScreensSlice.reducer;
