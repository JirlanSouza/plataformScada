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
    hasObjectsEditingsPropties: false,
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
    addObject: (state, action: PayloadAction<AddObjectActionPayload>) => {
      state.items.push(new Object(
        state.items.length,
        action.payload.type,
        action.payload.position,
        action.payload.size
      ))
    },
    manipulateObject: (state, action: PayloadAction<ManiputeObjectActionPayload>) => {
      const { id, manipulation, cursorPosition } = action.payload
      const { position, size } = state.items[id]
      const newObjectPorpties = manipulations[manipulation]({ position, size, cursorPosition })

      state.items[id] = {
        ...state.items[id],
        position: newObjectPorpties.position,
        size: newObjectPorpties.size
      }
    },
    editObject: (state, action: PayloadAction<EditObjectActionPayload>) => {
      const { id, position, size, style } = action.payload
      state.items[id] = {
        ...state.items[id],
        position,
        size,
        style
      }
    },
    removeObject: (state) => {
      state.items.forEach((object, index) => {
        if (object.selected) {
          delete state.items[index]
        }

      });
    },
    selectObject: (state, action: PayloadAction<{ id: number }>) => {
      state.items[action.payload.id] = {
        ...state.items[action.payload.id],
        selected: true
      }

      state.hasObjectsSelecteds = true;
    },
    unSelectObject: (state, action: PayloadAction<UnSelectObjectActionPayload>) => {
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
    },
    editingProptiesObject: (state, action: PayloadAction<number>) => {
      state.items[action.payload].editingPropties = true;
      state.hasObjectsEditingsPropties = true;
    },
    unEditingProptiesObject: (state, action: PayloadAction<UnSelectObjectActionPayload>) => {
      const index = state.items.findIndex(object => object.editingPropties === true);
        
      if (index === -1) return;
      state.items[index].editingPropties = false;
      state.hasObjectsEditingsPropties = false;
    },
  }
});

export const {
  addObject,
  manipulateObject,
  editObject,
  removeObject,
  selectObject,
  unSelectObject,
  editingProptiesObject,
  unEditingProptiesObject
} = ObjectsSlice.actions;
export const objectsReducer = ObjectsSlice.reducer;
