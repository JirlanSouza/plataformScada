export function resizeContainer(currentPosition: number, positionCursor: number): number {
  let width = 0;
  
  if (positionCursor > currentPosition) {
    width = positionCursor;
  } else {
    width = positionCursor;
  }
  
  return width;
}

interface Position {
  x: number,
  y: number
}

export function calcSizeFromPreviousPosition (previousPosition: Position, currentPosition: Position) {
  const width = currentPosition.x - previousPosition.x;
  const height = currentPosition.y - previousPosition.y

  return { width, height };
}