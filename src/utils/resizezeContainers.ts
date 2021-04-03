export function resizeContainer(currentPosition: number, positionCursor: number): number {
  let width = 0;
  console.log("Cursor position ======>>>", positionCursor, 'Atual position =======>>>', currentPosition, ' <<<<==========')
  if (positionCursor > currentPosition) {
    width = positionCursor;
  } else {
    width = positionCursor;
  }
  
  return width;
}