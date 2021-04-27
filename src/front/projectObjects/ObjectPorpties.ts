import React from 'react';
import {
  PositionPropties,
  SizePropties,
  ObjectStylePropties,
} from '../core/object';

export type { PositionPropties, SizePropties, ObjectStylePropties };

export interface ObjectEspecificPropties {
  propties: any;
}

export type ObjectComponent = React.FC<{
  objectIdentify: number;
  position: PositionPropties;
  size: SizePropties;
  style: ObjectStylePropties;
  especificPropties?: ObjectEspecificPropties;
  onClick: (identify: number) => void;
  onDoubleClick: (identify: number) => void;
}>;
