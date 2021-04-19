import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IObject, Object, manipulations } from '../../core/object';

type Objects = IObject[]
type AddObjectActionPayload = Pick<IObject, 'type' | 'position' | 'size'>
interface ManiputeObjectActionPayload extends Pick<IObject, 'id' | 'position' | 'size'> {
  manipulation: string,
  cursorPosition: Extract<IObject, 'position'>
}
type EditObjectActionPayload = Pick<IObject, 'id' | 'position' | 'size' | 'style'>
type RemoveObjectActionPayload = Pick<IObject, 'id'>

export const ObjectsSlice = createSlice({
  name: 'Objects',
  initialState: [] as Objects,
  reducers: {
    add: (state, action: PayloadAction<AddObjectActionPayload>) => {
      state.push(new Object(
        state.length,
        action.payload.type,
        action.payload.position,
        action.payload.size
      ))
    },
    manipulate: (state, action: PayloadAction<ManiputeObjectActionPayload>) => {
      const { id, manipulation, position, size, cursorPosition } = action.payload
      const newObjectPorpties = manipulations[manipulation]({ position, size, cursorPosition })

      state[id] = {
        ...state[id],
        position: newObjectPorpties.position,
        size: newObjectPorpties.size
      }
    },
    edit: (state, action: PayloadAction<EditObjectActionPayload>) => {
      const { id, position, size, style } = action.payload
      state[id] = {
        ...state[id],
        position,
        size,
        style
      }
    },
    remove: (state, action: PayloadAction<RemoveObjectActionPayload>) => {
      delete state[action.payload.id]
    }
  }
});

export const { add, manipulate, edit, remove } = ObjectsSlice.actions;
export const objectsReducer = ObjectsSlice.reducer;
