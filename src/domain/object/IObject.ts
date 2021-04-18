export interface IObject<ObjectComponent> {
  selected: boolean,
  editingPropties: boolean,
  componentToRender: ObjectComponent
  state: {
    positionX: number,
    positionY: number,
    width: number,
    height: number,
  }
  style: ObjectStylePropties
}

export interface ObjectStylePropties {
  font: FontPropties,
  background: BackgroundPropties,
  border: BorderPropties,
}

export interface FontPropties {
  size: number,
  color: string,
  bold: boolean,
  italic: boolean
}

export interface BackgroundPropties {
  color: string,
}

export interface BorderPropties {
  color: string,
  style: string,
  width: number
}

export interface PositionAndSizePropties {
  positionX: number,
  positionY: number,
  width: number,
  height: number
}