import { Rectangle } from './Rectangle';
import { Circle } from './Circle';
import { Triangle } from './Triangle';
import { Button } from './Button';
import { BarGraph } from './BarGraph';
import { ObjectComponent } from './ObjectPorpties';

export const ObjectsComponentsRender: { [key: string]: ObjectComponent } = {
  Rectangle,
  Circle,
  Triangle,
  Button,
  BarGraph,
};

export type ObjectsTypes =
  | 'Cursor'
  | 'Rectangle'
  | 'Circle'
  | 'Triangle'
  | 'Button'
  | 'BarGraph';
