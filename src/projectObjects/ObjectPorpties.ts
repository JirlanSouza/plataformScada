import React from "react";
import {
  BackgroundPropties,
  BorderPropties,
  FontPropties,
  PositionAndSizePropties
} from "../components/ModalProptiesObject";

export interface ObjectPositionAndSizePropties extends PositionAndSizePropties {};

export interface ObjectStylePropties {
  font: FontPropties,
  background: BackgroundPropties,
  border: BorderPropties,
}

export interface ObjectEspecificPropties {
  propties: any
}

export type ObjectComponent = React.FC<{
  objectIdentify: number,
  positionAndSize: PositionAndSizePropties,
  style: ObjectStylePropties,
  especificPropties?: ObjectEspecificPropties
  onClick: (identify: number) => void,
  onDoubleClick: (identify: number) => void
}>