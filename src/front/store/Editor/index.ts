import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PositionPropties, SizePropties } from '../../core/object';

interface StartManipulationActionPayload {
  objectSelected: number;
  manipulation: string;
  position: PositionPropties;
}

const EditorSlice = createSlice({
  name: 'editor',
  initialState: {
    toolSelected: 'Cursor',
    area: {
      width: 0,
      height: 0,
    },
    zoom: 100,
    zoomIsFitInEditorSpace: false,
    existObjectSelected: false,
    manipulating: false,
    initialStateOfManipulation: {
      objectSelected: -1,
      manipulation: '',
      position: {
        x: 0,
        y: 0,
      },
    },
  },
  reducers: {
    selectTool: (state, action: PayloadAction<string>) => {
      state.toolSelected = action.payload;
    },
    changeEditorArea: (state, action: PayloadAction<SizePropties>) => {
      state.area = action.payload;
    },
    zoomOut: (state) => {
      state.zoom -= 5; // (state.zoom / 100) * 5;
    },
    zoomIn: (state) => {
      state.zoom += 5; // (state.zoom / 100) * 5;
    },
    toFitZoomInEditorSpace: (state, action: PayloadAction<SizePropties>) => {
      if (state.zoomIsFitInEditorSpace) {
        state.zoom = 100;
        state.zoomIsFitInEditorSpace = false;
        return;
      }

      let proportion: number;

      if (state.area.width > state.area.height) {
        proportion = state.area.width / (action.payload.width / 100);
      } else {
        proportion = state.area.height / (action.payload.height / 100);
      }

      state.zoom = proportion;
      state.zoomIsFitInEditorSpace = true;
    },
    selectedObject: (state) => {
      state.existObjectSelected = true;
    },
    unSelectedObject: (state) => {
      state.existObjectSelected = false;
    },
    startManipulation: (
      state,
      action: PayloadAction<StartManipulationActionPayload>
    ) => {
      state.manipulating = true;
      state.initialStateOfManipulation = action.payload;
    },
    stopManipulation: (state) => {
      state.manipulating = false;
    },
  },
});

export const {
  selectTool,
  changeEditorArea,
  zoomIn,
  zoomOut,
  toFitZoomInEditorSpace,
  selectedObject,
  unSelectedObject,
  startManipulation,
  stopManipulation,
} = EditorSlice.actions;
export const editorReducer = EditorSlice.reducer;
