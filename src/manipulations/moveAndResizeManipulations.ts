interface ManipulationPropties {
  stateObject: {
    positionX: number,
    positionY: number,
    width: number,
    height: number
  },
  cursorPosition: {
    X: number,
    Y: number
  }
}

interface ManipulationReturn {
  positionX: number,
  positionY: number,
  width: number,
  height: number
}

function move (props: ManipulationPropties): ManipulationReturn {
  function setPosition (value1: number, position: number) {
    return position - (value1 / 2) <= 0 ? 0 : position - (value1 / 2);
  }

  const positionX = setPosition(props.stateObject.width, props.cursorPosition.X)
  const positionY = setPosition(props.stateObject.height, props.cursorPosition.Y);
  const width = props.stateObject.width;
  const height = props.stateObject.height;

  return { positionX, positionY, width, height };
}

function resizeUp (props: ManipulationPropties): ManipulationReturn {

  const positionX = props.stateObject.positionX;
  const positionY = props.cursorPosition.Y;
  const width = props.stateObject.width;
  const height = props.stateObject.height + (props.stateObject.positionY - props.cursorPosition.Y);

  return { positionX, positionY, width, height };

}

function resizeDown (props: ManipulationPropties): ManipulationReturn {

  const positionX = props.stateObject.positionX;
  const positionY = props.stateObject.positionY;
  const width = props.stateObject.width;
  const height = props.cursorPosition.Y - props.stateObject.positionY;

  return { positionX, positionY, width, height };

}

function resizeLeft (props: ManipulationPropties): ManipulationReturn {

  const positionX = props.cursorPosition.X;
  const positionY = props.stateObject.positionY;
  const width = props.stateObject.width  + (props.stateObject.positionX - props.cursorPosition.X);
  const height = props.stateObject.height;

  return { positionX, positionY, width, height };

}

function resizeRight (props: ManipulationPropties): ManipulationReturn {

  const positionX = props.stateObject.positionX;
  const positionY = props.stateObject.positionY;
  const width = props.cursorPosition.X - props.stateObject.positionX;
  const height = props.stateObject.height;

  return { positionX, positionY, width, height };

}

function resizeLeftUp (props: ManipulationPropties): ManipulationReturn {

  const positionX = props.cursorPosition.X;
  const positionY = props.cursorPosition.Y;
  const width = props.stateObject.width  + (props.stateObject.positionX - props.cursorPosition.X);
  const height = props.stateObject.height + (props.stateObject.positionY - props.cursorPosition.Y);

  return { positionX, positionY, width, height };

}

function resizeRightUp (props: ManipulationPropties): ManipulationReturn {

  const advanceX = props.cursorPosition.X - props.stateObject.positionX;
  const advanceY = props.stateObject.height + (props.stateObject.positionY - props.cursorPosition.Y);

  const percentageIncreaseX = calcPercentageFromValue(props.stateObject.width, advanceX);
  const percentageIncreaseY = calcPercentageFromValue(props.stateObject.height, advanceY);

  const positionX = props.stateObject.positionX;
  const positionY = props.stateObject.positionY - diferenceByPorcentage(hiValue(percentageIncreaseX, percentageIncreaseY), props.stateObject.height);
  const width = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.stateObject.width);
  const height = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.stateObject.height);

  return { positionX, positionY, width, height };

}

function resizeRightDown (props: ManipulationPropties): ManipulationReturn {

  const positionX = props.stateObject.positionX;
  const positionY = props.stateObject.positionY;

  const advanceX = props.cursorPosition.X - props.stateObject.positionX;
  const advanceY = props.cursorPosition.Y - props.stateObject.positionY;

  const percentageIncreaseX = calcPercentageFromValue(props.stateObject.width, advanceX);
  const percentageIncreaseY = calcPercentageFromValue(props.stateObject.height, advanceY);

  const width = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.stateObject.width);
  const height = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.stateObject.height);

  return { positionX, positionY, width, height };

}

function resizeLeftDown (props: ManipulationPropties): ManipulationReturn {

  const positionX = props.cursorPosition.X;
  const positionY = props.stateObject.positionY;
  const width = props.stateObject.width  + (props.stateObject.positionX - props.cursorPosition.X);
  const height = props.cursorPosition.Y - props.stateObject.positionY;

  return { positionX, positionY, width, height };

}

function hiValue (value1: number, value2: number) {
  return value1 > value2 ? value1 : value2;
}

function increaseByPorcentage (percentage: number, value: number) {
  return value + diferenceByPorcentage(percentage, value);
}

function diferenceByPorcentage (percentage: number, value: number) {
  return ((value / 100) * percentage);
}

function increaseByHighestPorcentage (percentage1: number, percentage2: number, value: number) {
  return increaseByPorcentage(hiValue(percentage1, percentage2), value);
}

function calcPercentageFromValue (valueBase: number, value: number) {
  return (value - valueBase) / (valueBase / 100);
}

// function calcValueFromPercentage (percentage: number, value: number) {
//   return (value - valueBase) / (valueBase / 100);
// }

export const manipulations: {[key: string]: (props: ManipulationPropties) => ManipulationReturn} = {
  'move': move,
  'resizeUp': resizeUp,
  'resizeDown': resizeDown,
  'resizeLeft': resizeLeft,
  'resizeRight': resizeRight,
  'resizeLeftUp': resizeLeftUp,
  'resizeRightUp': resizeRightUp,
  'resizeRightDown': resizeRightDown,
  'resizeLeftDown': resizeLeftDown
}