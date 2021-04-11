import React from "react";

export interface ObjectPositionAndSizePropties {
  positionX: number,
  positionY: number,
  width: number,
  height: number
}

interface fontPropties {
  size: number,
  color: string,
  bold: boolean,
  italic: boolean
}



export interface ObjectStylePropties {
  background: string,
  borderColor: string,
  border: number,
  borderRadius: number,
  font: fontPropties
}

export interface ObjectEspecificPropties {
  propties: any
}

export type ObjectComponent = React.FC<{
  objectIdentify: number,
  positionAndSize: ObjectPositionAndSizePropties,
  style: ObjectStylePropties,
  especificPropties?: ObjectEspecificPropties
  onClick: (identify: number) => void
}>