export interface ObjectStylePropties {
  positionX: number,
  positionY: number,
  width: number,
  height: number
}

export type ObjectComponent = React.FC<{
  objectIdentify: number,
  objectStylePropties: ObjectStylePropties,
  onClick: (identify: number) => void
}>