import { IObject } from './IObject';
import { ObjectsTypes } from '../../projectObjects';

export class Object implements IObject {
  selected = false;

  editingPropties = false;

  style = {
    background: {
      color: '#C5C5C5',
    },
    border: {
      color: '#3A3A3A',
      style: 'solid',
      width: 0,
    },
  };

  constructor(
    public id: number,
    public type: ObjectsTypes,
    public position: { x: number; y: number },
    public size: { width: number; height: number }
  ) {}
}
