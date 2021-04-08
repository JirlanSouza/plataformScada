const Rect = (
  context: CanvasRenderingContext2D,
  startPosition: { x: number, y: number},
  weight: {x: number, y: number},
  color: string
) : void => {
  context.fillStyle = color

  context.clearRect(startPosition.x, startPosition.y, weight.x, weight.y);
  context.fillRect(startPosition.x, startPosition.y, weight.x, weight.y);
  context.strokeRect(startPosition.x, startPosition.y, weight.x, weight.y);
}

export default Rect;