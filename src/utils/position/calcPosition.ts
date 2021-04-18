// function calcCursorPositionOnScreen(positionX: number, positionY: number) {
//   const cursorPositionX = positionX - containerWidth
//   const cursorPositionY = positionY - parseInt(theme.headerHeight)

//   return { cursorPositionX, cursorPositionY };
// }

// interface RegionPropties { X: number, Y: number, width: number, height: number }

// function cursorInScreenRegion(regionPropties: RegionPropties, cursorPositionX: number, cursorPositionY: number) {
//   const regionXStartObject = regionPropties.X;
//   const regionXEndObject = regionPropties.X + regionPropties.width;
//   const regionYStartObject = regionPropties.Y;
//   const regionYEndObject = regionPropties.Y + regionPropties.height;

//   const cursorIsInsideRegigionX = (cursorPositionX >= regionXStartObject && cursorPositionX <= regionXEndObject)
//   const cursorIsInsideRegionY = (cursorPositionY >= regionYStartObject && cursorPositionY <= regionYEndObject)

//   return (cursorIsInsideRegigionX && cursorIsInsideRegionY);
// }
export {};