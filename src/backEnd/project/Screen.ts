export interface ProjectScreen {
  id: number;
  name: string;
  isStartScreen: boolean;
  size: SizePropties;
  // eslint-disable-next-line @typescript-eslint/ban-types
  objects: Object[];
}

type Object = {
  id: number;
  type: string;
  position: PositionPropties;
  size: SizePropties;
  style: ObjectStylePropties;
};

type ObjectStylePropties = {
  font: FontPropties;
  background: BackgroundPropties;
  border: BorderPropties;
};

type FontPropties = {
  size: number;
  color: string;
  bold: boolean;
  italic: boolean;
};

type BackgroundPropties = {
  color: string;
};

type BorderPropties = {
  color: string;
  style: string;
  width: number;
};

type PositionPropties = {
  x: number;
  y: number;
};

type SizePropties = {
  width: number;
  height: number;
};
