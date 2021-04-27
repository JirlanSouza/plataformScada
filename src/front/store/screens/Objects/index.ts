import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ScreensState } from '..';

import {
  IObject,
  Object,
  PositionPropties,
  manipulations,
} from '../../../core/object';
import { cursorInScreenRegion } from '../../../utils/position/calcPosition';

type AddObjectActionPayload = Pick<IObject, 'type' | 'position' | 'size'>;
interface ManiputeObjectActionPayload extends Pick<IObject, 'id'> {
  manipulation: string;
  cursorPosition: PositionPropties;
}
type EditObjectActionPayload = Pick<
  IObject,
  'id' | 'position' | 'size' | 'style'
>;
interface UnSelectObjectActionPayload {
  cursorPosition: PositionPropties;
}

const addObject: CaseReducer<
  ScreensState,
  PayloadAction<AddObjectActionPayload>
> = (state, action) => {
  state[0].objects.items.push(
    new Object(
      state[0].objects.items.length,
      action.payload.type,
      action.payload.position,
      action.payload.size
    )
  );
};

const manipulateObject: CaseReducer<
  ScreensState,
  PayloadAction<ManiputeObjectActionPayload>
> = (state, action) => {
  const { id, manipulation, cursorPosition } = action.payload;
  const { position, size } = state[0].objects.items[id];
  const newObjectPorpties = manipulations[manipulation]({
    position,
    size,
    cursorPosition,
  });

  state[0].objects.items[id] = {
    ...state[0].objects.items[id],
    position: newObjectPorpties.position,
    size: newObjectPorpties.size,
  };
};

const editObject: CaseReducer<
  ScreensState,
  PayloadAction<EditObjectActionPayload>
> = (state, action) => {
  const { id, position, size, style } = action.payload;
  state[0].objects.items[id] = {
    ...state[0].objects.items[id],
    position,
    size,
    style,
  };
};

const removeObject: CaseReducer<ScreensState> = (state: ScreensState) => {
  state[0].objects.items.forEach((object, index) => {
    if (object.selected) {
      delete state[0].objects.items[index];
    }
  });
};

const selectObject: CaseReducer<ScreensState, PayloadAction<{ id: number }>> = (
  state,
  action
) => {
  state[0].objects.items[action.payload.id] = {
    ...state[0].objects.items[action.payload.id],
    selected: true,
  };

  state[0].objects.hasObjectsSelecteds = true;
};

const unSelectObject: CaseReducer<
  ScreensState,
  PayloadAction<UnSelectObjectActionPayload>
> = (state, action) => {
  let hasNotObjectSelected = true;

  state[0].objects.items.forEach((object, index) => {
    const cursorInObject = cursorInScreenRegion(
      { ...object.position, ...object.size },
      action.payload.cursorPosition
    );

    state[0].objects.items[index] = {
      ...object,
      selected: cursorInObject,
    };
    if (hasNotObjectSelected) hasNotObjectSelected = !cursorInObject;
  });

  state[0].objects.hasObjectsSelecteds = !hasNotObjectSelected;
};

const editingProptiesObject: CaseReducer<
  ScreensState,
  PayloadAction<number>
> = (state, action) => {
  state[0].objects.items[action.payload].editingPropties = true;
  state[0].objects.hasObjectsEditingsPropties = true;
};

const unEditingProptiesObject: CaseReducer<
  ScreensState,
  PayloadAction<number>
> = (state, action) => {
  state[0].objects.items[action.payload].editingPropties = false;
  state[0].objects.hasObjectsEditingsPropties = false;
};

export {
  addObject,
  manipulateObject,
  editObject,
  removeObject,
  selectObject,
  unSelectObject,
  editingProptiesObject,
  unEditingProptiesObject,
};
