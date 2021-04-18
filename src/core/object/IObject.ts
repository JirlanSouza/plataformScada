export interface IObject {
  id: number,
  type: string,
  selected: boolean,
  editingPropties: boolean,
  position: {
    x: number,
    y: number,
  },
  size: {
    width: number,
    height: number,
  },
  style: ObjectStylePropties
}

export interface ObjectStylePropties {
  font?: FontPropties,
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
  x: number,
  y: number,
  width: number,
  height: number
}