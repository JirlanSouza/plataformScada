import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IObject, Object, PositionPropties, manipulations } from '../../core/object';
import { cursorInScreenRegion } from '../../utils/position/calcPosition';

interface Objects {
  hasObjectsSelecteds: boolean,
  items: IObject[]
}

type AddObjectActionPayload = Pick<IObject, 'type' | 'position' | 'size'>
interface ManiputeObjectActionPayload extends Pick<IObject, 'id'> {
  manipulation: string,
  cursorPosition: PositionPropties
}
type EditObjectActionPayload = Pick<IObject, 'id' | 'position' | 'size' | 'style'>
type RemoveObjectActionPayload = Pick<IObject, 'id'>
interface UnSelectObjectActionPayload {
  cursorPosition: PositionPropties
}

export const ObjectsSlice = createSlice({
  name: 'Objects',
  initialState: {
    hasObjectsSelecteds: false,
    items: [new Object(
      0,
      'Button',
      { x: 20, y: 20 },
      { width: 200, height: 200 }
    ),
    new Object(
      0,
      'Triangle',
      { x: 250, y: 20 },
      { width: 200, height: 200 }
    ),
    ] as IObject[]
  },
  reducers: {
    add: (state, action: PayloadAction<AddObjectActionPayload>) => {
      state.items.push(new Object(
        state.items.length,
        action.payload.type,
        action.payload.position,
        action.payload.size
      ))
    },
    manipulate: (state, action: PayloadAction<ManiputeObjectActionPayload>) => {
      const { id, manipulation, cursorPosition } = action.payload
      const { position, size } = state.items[id]
      const newObjectPorpties = manipulations[manipulation]({ position, size, cursorPosition })

      state.items[id] = {
        ...state.items[id],
        position: newObjectPorpties.position,
        size: newObjectPorpties.size
      }
    },
    edit: (state, action: PayloadAction<EditObjectActionPayload>) => {
      const { id, position, size, style } = action.payload
      state.items[id] = {
        ...state.items[id],
        position,
        size,
        style
      }
    },
    remove: (state, action: PayloadAction<RemoveObjectActionPayload>) => {
      delete state.items[action.payload.id]
    },
    select: (state, action: PayloadAction<{ id: number }>) => {
      state.items[action.payload.id] = {
        ...state.items[action.payload.id],
        selected: true
      }

      state.hasObjectsSelecteds = true;
    },
    unSelect: (state, action: PayloadAction<UnSelectObjectActionPayload>) => {
      let hasNotObjectSelected = true;

      state.items.forEach((object, index) => {
        const cursorInObject = cursorInScreenRegion(
          { ...object.position, ...object.size },
          action.payload.cursorPosition
        );

        state.items[index] = {
          ...object,
          selected: cursorInObject
        }
        if (hasNotObjectSelected) hasNotObjectSelected = !cursorInObject;
      });

      state.hasObjectsSelecteds = !hasNotObjectSelected;
    }
  }
});

export const { add, manipulate, edit, remove, select, unSelect } = ObjectsSlice.actions;
export const objectsReducer = ObjectsSlice.reducer;
