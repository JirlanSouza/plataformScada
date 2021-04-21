import { createAsyncThunk,  createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PositionPropties } from '../../core/object'
import { RootState } from '../';

interface StartManipulationActionPayload { 
  objectSelected:  number,
  manipulation: string,
  position: PositionPropties
}



const EditorSlice = createSlice({
  name: 'editor',
  initialState: {
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

export const { selectedObject, unSelectedObject, startManipulation, stopManipulation } = EditorSlice.actions;
export const editorReducer = EditorSlice.reducer;