export interface ManipulationPropties {
  position: {
    x: number,
    y: number,
  },
  size: {
    width: number,
    height: number
  },
  cursorPosition: {
    x: number,
    y: number
  }
}

interface ManipulationReturn {
  position: {
    x: number,
    y: number,
  },
  size: {
    width: number,
    height: number
  }
}

function move(props: ManipulationPropties): ManipulationReturn {
  function setPosition(value1: number, position: number) {
    return position - (value1 / 2) <= 0 ? 0 : position - (value1 / 2);
  }

  const positionX = setPosition(props.size.width, props.cursorPosition.x)
  const positionY = setPosition(props.size.height, props.cursorPosition.y);
  const width = props.size.width;
  const height = props.size.height;

  return {
    position: {
      x: positionX,
      y: positionY,
    },
    size: {
      width,
      height
    }
  }
}

function resizeUp(props: ManipulationPropties): ManipulationReturn {

  const positionX = props.position.x;
  const positionY = props.cursorPosition.y;
  const width = props.size.width;
  const height = props.size.height + (props.position.y - props.cursorPosition.y);

  return {
    position: {
      x: positionX,
      y: positionY,
    },
    size: {
      width,
      height
    }
  }

}

function resizeDown(props: ManipulationPropties): ManipulationReturn {

  const positionX = props.position.x;
  const positionY = props.position.y;
  const width = props.size.width;
  const height = props.cursorPosition.y - props.position.y;

  return {
    position: {
      x: positionX,
      y: positionY,
    },
    size: {
      width,
      height
    }
  }

}

function resizeLeft(props: ManipulationPropties): ManipulationReturn {

  const positionX = props.cursorPosition.x;
  const positionY = props.position.y;
  const width = props.size.width + (props.position.x - props.cursorPosition.x);
  const height = props.size.height;

  return {
    position: {
      x: positionX,
      y: positionY,
    },
    size: {
      width,
      height
    }
  }

}

function resizeRight(props: ManipulationPropties): ManipulationReturn {

  const positionX = props.position.x;
  const positionY = props.position.y;
  const width = props.cursorPosition.x - props.position.x;
  const height = props.size.height;

  return {
    position: {
      x: positionX,
      y: positionY,
    },
    size: {
      width,
      height
    }
  }

}

function resizeLeftUp(props: ManipulationPropties): ManipulationReturn {

  const advanceX = props.cursorPosition.x - props.position.x;
  const advanceY = props.size.height + (props.position.y - props.cursorPosition.y);

  const percentageIncreaseX = calcPercentageFromValue(props.size.width, advanceX);
  const percentageIncreaseY = calcPercentageFromValue(props.size.height, advanceY);

  const positionX =
    props.position.x - diferenceByPorcentage(
      hiValue(percentageIncreaseX, percentageIncreaseY),
      props.size.height
    );

  const positionY =
    props.position.y - diferenceByPorcentage(
      hiValue(percentageIncreaseX, percentageIncreaseY),
      props.size.height
    );

  const width = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.size.width);
  const height = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.size.height);

  return {
    position: {
      x: positionX,
      y: positionY,
    },
    size: {
      width,
      height
    }
  }

}

function resizeRightUp(props: ManipulationPropties): ManipulationReturn {

  const advanceX = props.cursorPosition.x - props.position.x;
  const advanceY = props.size.height + (props.position.y - props.cursorPosition.y);

  const percentageIncreaseX = calcPercentageFromValue(props.size.width, advanceX);
  const percentageIncreaseY = calcPercentageFromValue(props.size.height, advanceY);

  const positionX = props.position.x;
  const positionY =
    props.position.y - diferenceByPorcentage(
      hiValue(percentageIncreaseX, percentageIncreaseY),
      props.size.height
    );

  const width = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.size.width);
  const height = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.size.height);

  return {
    position: {
      x: positionX,
      y: positionY,
    },
    size: {
      width,
      height
    }
  }

}

function resizeRightDown(props: ManipulationPropties): ManipulationReturn {

  const positionX = props.position.x;
  const positionY = props.position.y;

  const advanceX = props.cursorPosition.x - props.position.x;
  const advanceY = props.cursorPosition.y - props.position.y;

  const percentageIncreaseX = calcPercentageFromValue(props.size.width, advanceX);
  const percentageIncreaseY = calcPercentageFromValue(props.size.height, advanceY);

  const width = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.size.width);
  const height = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.size.height);

  return {
    position: {
      x: positionX,
      y: positionY,
    },
    size: {
      width,
      height
    }
  }

}

function resizeLeftDown(props: ManipulationPropties): ManipulationReturn {

  const advanceX = props.cursorPosition.x - props.position.x;
  const advanceY = props.cursorPosition.y - props.position.y;

  const percentageIncreaseX = calcPercentageFromValue(props.size.width, advanceX);
  const percentageIncreaseY = calcPercentageFromValue(props.size.height, advanceY);

  const positionX =
    props.position.x - diferenceByPorcentage(
      hiValue(percentageIncreaseX, percentageIncreaseY),
      props.size.width
    );

  const positionY = props.position.y;
  const width = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.size.width);
  const height = increaseByHighestPorcentage(percentageIncreaseX, percentageIncreaseY, props.size.height);

  return {
    position: {
      x: positionX,
      y: positionY,
    },
    size: {
      width,
      height
    }
  }

}

function hiValue(value1: number, value2: number) {
  return value1 > value2 ? value1 : value2;
}

function increaseByPorcentage(percentage: number, value: number) {
  return value + diferenceByPorcentage(percentage, value);
}

function diferenceByPorcentage(percentage: number, value: number) {
  return ((value / 100) * percentage);
}

function increaseByHighestPorcentage(percentage1: number, percentage2: number, value: number) {
  return increaseByPorcentage(hiValue(percentage1, percentage2), value);
}

function calcPercentageFromValue(valueBase: number, value: number) {
  return (value - valueBase) / (valueBase / 100);
}

export const manipulations: { [key: string]: (props: ManipulationPropties) => ManipulationReturn } = {
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