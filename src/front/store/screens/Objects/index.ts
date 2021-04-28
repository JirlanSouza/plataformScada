import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ScreenState } from '..';

import {
  IObject,
  Object,
  PositionPropties,
  manipulations,
} from '../../../core/object';
import { cursorInScreenRegion } from '../../../utils/position/calcPosition';

type AddObjectActionPayload = Pick<IObject, 'type' | 'position' | 'size'>;
type ManipulateObjectActionPayload = {
  id: number;
  manipulation: string;
  cursorPosition: PositionPropties;
};
type EditObjectActionPayload = Pick<
  IObject,
  'id' | 'position' | 'size' | 'style'
>;
type UnSelectObjectActionPayload = {
  cursorPosition: PositionPropties;
};

const addObject: CaseReducer<
  ScreenState,
  PayloadAction<AddObjectActionPayload>
> = (state, action) => {
  state.items[state.screenOpening].objects.items.push(
    new Object(
      state.items[state.screenOpening].objects.items.length,
      action.payload.type,
      action.payload.position,
      action.payload.size
    )
  );
};

const manipulateObject: CaseReducer<
  ScreenState,
  PayloadAction<ManipulateObjectActionPayload>
> = (state, action) => {
  const { id, manipulation, cursorPosition } = action.payload;
  const { position, size } = state.items[state.screenOpening].objects.items[id];
  const newObjectPorpties = manipulations[manipulation]({
    position,
    size,
    cursorPosition,
  });

  state.items[state.screenOpening].objects.items[id] = {
    ...state.items[state.screenOpening].objects.items[id],
    position: newObjectPorpties.position,
    size: newObjectPorpties.size,
  };
};

const editObject: CaseReducer<
  ScreenState,
  PayloadAction<EditObjectActionPayload>
> = (state, action) => {
  const { id, position, size, style } = action.payload;
  state.items[state.screenOpening].objects.items[id] = {
    ...state.items[state.screenOpening].objects.items[id],
    position,
    size,
    style,
  };
};

const removeObject: CaseReducer<ScreenState> = (state: ScreenState) => {
  state.items[state.screenOpening].objects.items.forEach((object, index) => {
    if (object.selected) {
      delete state.items[state.screenOpening].objects.items[index];
    }
  });
};

const selectObject: CaseReducer<ScreenState, PayloadAction<{ id: number }>> = (
  state,
  action
) => {
  state.items[state.screenOpening].objects.items[action.payload.id] = {
    ...state.items[state.screenOpening].objects.items[action.payload.id],
    selected: true,
  };

  state.items[state.screenOpening].objects.hasObjectsSelecteds = true;
};

const unSelectObject: CaseReducer<
  ScreenState,
  PayloadAction<UnSelectObjectActionPayload>
> = (state, action) => {
  let hasNotObjectSelected = true;

  state.items[state.screenOpening].objects.items.forEach((object, index) => {
    const cursorInObject = cursorInScreenRegion(
      { ...object.position, ...object.size },
      action.payload.cursorPosition
    );

    state.items[state.screenOpening].objects.items[index] = {
      ...object,
      selected: cursorInObject,
    };
    if (hasNotObjectSelected) hasNotObjectSelected = !cursorInObject;
  });

  state.items[
    state.screenOpening
  ].objects.hasObjectsSelecteds = !hasNotObjectSelected;
};

const editingProptiesObject: CaseReducer<ScreenState, PayloadAction<number>> = (
  state,
  action
) => {
  state.items[state.screenOpening].objects.items[
    action.payload
  ].editingPropties = true;
  state.items[state.screenOpening].objects.hasObjectsEditingsPropties = true;
};

const unEditingProptiesObject: CaseReducer<
  ScreenState,
  PayloadAction<number>
> = (state, action) => {
  state.items[state.screenOpening].objects.items[
    action.payload
  ].editingPropties = false;
  state.items[state.screenOpening].objects.hasObjectsEditingsPropties = false;
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
