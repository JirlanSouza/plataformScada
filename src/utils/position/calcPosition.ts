interface RegionPropties { x: number, y: number, width: number, height: number }
interface CursorPosition { x: number, y: number} 

function cursorInScreenRegion(regionPropties: RegionPropties, cursorPosition: CursorPosition) {
  const regionXStartObject = regionPropties.x;
  const regionXEndObject = regionPropties.x + regionPropties.width;
  const regionYStartObject = regionPropties.y;
  const regionYEndObject = regionPropties.y + regionPropties.height;

  const cursorIsInsideRegigionX = (cursorPosition.x >= regionXStartObject && cursorPosition.x <= regionXEndObject)
  const cursorIsInsideRegionY = (cursorPosition.y >= regionYStartObject && cursorPosition.y <= regionYEndObject)

  return (cursorIsInsideRegigionX && cursorIsInsideRegionY);
}
export { cursorInScreenRegion };