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

type ObjectsState = {
  hasObjectsSelecteds: boolean;
  hasObjectsEditingsPropties: boolean;
  items: IObject[];
};

type ScreenItemState = {
  id: number;
  name: string;
  isStartScreen: boolean;
  size: {
    width: number;
    height: number;
  };
  objects: ObjectsState;
};

export type ScreenState = {
  screenOpening: number;
  items: ScreenItemState[];
};

type AddScreenActionPayload = {
  name: string;
  size: {
    width: number;
    height: number;
  };
};

export const ScreensSlice = createSlice({
  name: 'screens',
  initialState: {
    screenOpening: -1,
    items: [] as ScreenItemState[],
  },
  reducers: {
    addScreen: (state, action: PayloadAction<AddScreenActionPayload>) => {
      state.items = [
        ...state.items,
        {
          ...action.payload,
          id: state.items.length,
          isStartScreen: false,
          objects: {
            hasObjectsSelecteds: false,
            hasObjectsEditingsPropties: false,
            items: [],
          },
        },
      ];

      // state.screenOpening = state.items.length;
    },
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
