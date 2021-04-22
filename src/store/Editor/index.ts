import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PositionPropties } from '../../core/object'
interface StartManipulationActionPayload {
  objectSelected: number,
  manipulation: string,
  position: PositionPropties
}



const EditorSlice = createSlice({
  name: 'editor',
  initialState: {
    toolSelected: 'Cursor',
    existObjectSelected: false,
    manipulating: false,
    initialStateOfManipulation: {
      objectSelected: -1,
      manipulation: '',
      position: {
        x: 0,
        y: 0
      }
    }
  },
  reducers: {
    selectTool: (state, action: PayloadAction<string>) => {
      state.toolSelected = action.payload;
    },
    selectedObject: state => {
      state.existObjectSelected = true;
    },
    unSelectedObject: state => {
      state.existObjectSelected = false;
    },
    startManipulation: (state, action: PayloadAction<StartManipulationActionPayload>) => {
      state.manipulating = true;
      state.initialStateOfManipulation = action.payload
    },
    stopManipulation: state => {
      state.manipulating = false;
    }
  }
});

export const {
  selectTool,
  selectedObject,
  unSelectedObject,
  startManipulation,
  stopManipulation
} = EditorSlice.actions;
export const editorReducer = EditorSlice.reducer;