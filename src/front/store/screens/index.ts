import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  screenOpening: number;
  items: {
    id: number;
    name: string;
    isStartScreen: boolean;
    size: {
      width: number;
      height: number;
    };
    objects: ObjectsState;
  }[];
}

export const ScreensSlice = createSlice({
  name: 'screens',
  initialState: {
    screenOpening: -1,
    items: [
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
      {
        id: 1,
        name: 'geral',
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
      {
        id: 2,
        name: 'geral operação',
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
      {
        id: 3,
        name: 'operação',
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
    ],
  },
  reducers: {
    onpeningScreen: (state, action: PayloadAction<number>) => {
      state.screenOpening = action.payload;
    },
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
