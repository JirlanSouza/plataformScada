import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const DialogObjectPorptiesEditSlice = createSlice({
  name: 'dialogObjectProptiesEdit',
  initialState: {
    position: {
      x: 300,
      y: 80,
    },
  },
  reducers: {
    moveDialog: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.position = action.payload;
    },
  },
});

export const { moveDialog } = DialogObjectPorptiesEditSlice.actions;
export const dialogObjectProptiesEditReducer =
  DialogObjectPorptiesEditSlice.reducer;
