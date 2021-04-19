import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IObject, Object, PositionPropties, manipulations } from '../../core/object';

type Objects = IObject[]
type AddObjectActionPayload = Pick<IObject, 'type' | 'position' | 'size'>
interface ManiputeObjectActionPayload extends Pick<IObject, 'id'> {
  manipulation: string,
  cursorPosition: PositionPropties
}
type EditObjectActionPayload = Pick<IObject, 'id' | 'position' | 'size' | 'style'>
type RemoveObjectActionPayload = Pick<IObject, 'id'>

export const ObjectsSlice = createSlice({
  name: 'Objects',
  initialState: [new Object(
    0,
    'Button',
    {x: 20, y: 20},
    {width: 200, height: 200}
  ),
  new Object(
    0,
    'Triangle',
    {x: 250, y: 20},
    {width: 200, height: 200}
  ),
] as Objects,
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
      const { id, manipulation, cursorPosition } = action.payload
      const { position, size } = state[id]
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
    },
    select: (state, action: PayloadAction<{id: number}>) => {
      state[action.payload.id]= {
        ...state[action.payload.id],
        selected: !state[action.payload.id].selected
      }
    }
  }
});

export const { add, manipulate, edit, remove, select } = ObjectsSlice.actions;
export const objectsReducer = ObjectsSlice.reducer;
