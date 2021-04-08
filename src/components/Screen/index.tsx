import React, { useEffect, useRef, useState } from 'react';
import { theme } from '../../styles/theme';
import { useEditorContext, useProjectTreeContext, useAppContext } from '../../contexts';

import { Container, Wrapper } from './styles';
import { Triangle, Rectangle, Circle } from '../../projectObjects/index';

import ManipulationBorder from '../ManipulationBorder';
import { manipulations } from '../../manipulations/moveAndResizeManipulations';
import { ObjectComponent } from '../../projectObjects/ObjectPorpties';

type ObjectComponentToRender = ObjectComponent;

interface Object {
  selected: boolean,
  componentToRender: ObjectComponentToRender
  state: {
    positionX: number,
    positionY: number,
    width: number,
    height: number,
  }
}

const objectsComponentsRender: { [key: string]: ObjectComponentToRender } = {
  'Rectangle': Rectangle,
  'Circle': Circle,
  'Triangle': Triangle,
}


const Screen: React.FC = () => {
  const [screenWidth, setScreenWdth] = useState(1366);
  const [screenHeight, setScreenHeight] = useState(768);
  const [isManipulating, setIsManipulating] = useState(false);

  const [stateManipulation, setStateManipulation] = useState({
    manipulation: '',
    cursorPositionX: 0,
    cursorPositionY: 0
  });

  const [startManipulations, setStartManipulations] = useState([] as boolean[]);
  const [objectIdentify, setObjectIdentify] = useState(-1);
  const [stateObject, setStateObject] = useState({
    selected: false,
    positionX: 100,
    positionY: 100,
    width: 200,
    height: 136.4
  });

  const [objects, setObjects] = useState([] as Object[]);

  const { keysPressed, setKeysPressed } = useAppContext()
  const { lineGridWeight, toolSelected } = useEditorContext();
  const { containerWidth } = useProjectTreeContext();

  const screenRef = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   const canvas = screenRef?.current;
  //   const context = canvas?.getContext('2d');
  //   console.log(context);

  //   if (canvas && context) {
  //     context.clearRect(0, 0, screenWidth, screenHeight);
  //     context.strokeStyle = theme.pallete.onBackground

  //     for (let i = lineGridWeight; i <= screenWidth; i += lineGridWeight) {
  //       context.beginPath();
  //       context.moveTo(i, 0);
  //       context.lineTo(i, screenHeight);
  //       context.stroke();
  //       context.closePath();
  //     };

  //     for (let i = lineGridWeight; i <= screenHeight; i += lineGridWeight) {
  //       context.beginPath();
  //       context.moveTo(0, i);
  //       context.lineTo(screenWidth, i);
  //       context.stroke();
  //       context.closePath();
  //     };
  //   }
  // }, [screenWidth, screenHeight, lineGridWeight, objects]);

  function calcCursorPositionOnScreen(event: React.MouseEvent) {
    const cursorPositionX = event.pageX - containerWidth
    const cursorPositionY = event.pageY - parseInt(theme.headerHeight)

    return { cursorPositionX, cursorPositionY };
  }

  function cursorOnInObject(objects: Object[], mouseEvent: React.MouseEvent) {
    const { cursorPositionX, cursorPositionY } = calcCursorPositionOnScreen(mouseEvent);
    let cursorIsOnInObject = false;

    objects.forEach(object => {
      const regionXStartObject = object.state.positionX;
      const regionXEndObject = object.state.positionX + object.state.width;
      const regionYStartObject = object.state.positionY;
      const regionYEndObject = object.state.positionY + object.state.height;

      const cursorIsInsideRegigionX = (cursorPositionX >= regionXStartObject && cursorPositionX <= regionXEndObject)
      const cursorIsInsideRegionY = (cursorPositionY >= regionYStartObject && cursorPositionY <= regionYEndObject)

      if (cursorIsInsideRegigionX && cursorIsInsideRegionY) cursorIsOnInObject = true;
    })

    return cursorIsOnInObject;

  }

  function handleScreenClick(event: React.MouseEvent) {
    if (startManipulations && !isManipulating && !cursorOnInObject(objects, event)) {
      const objectsUpdate = objects.slice();
      objectsUpdate.forEach((object, index) => {
        objectsUpdate[index].selected = false;
      })

      setObjects(objectsUpdate);
      setObjectIdentify(-1);
    }

    if (!isManipulating && toolSelected !== 'Cursor') {
      handleIsertObject(event);
    }
  }

  function handleSelectObject(identify: number) {
    if (!startManipulations[identify] && !isManipulating) {
      const objectsUpdate = objects.slice();

      if (!isCtrlAndShiftKeysPressed()) {
        objectsUpdate.forEach((object, index) => {
          objectsUpdate[index].selected = false;
        });
      }
      objectsUpdate[identify].selected = true;

      setObjects(objectsUpdate);
      setObjectIdentify(identify);
    }
  }

  function handleIsertObject(event: React.MouseEvent) {
    if (typeof objectsComponentsRender[toolSelected] !== 'function') return

    const objectsWithUpdate = objects.slice();
    objectsWithUpdate.push({
      selected: true,
      componentToRender: objectsComponentsRender[toolSelected],
      state: {
        positionX: calcCursorPositionOnScreen(event).cursorPositionX,
        positionY: calcCursorPositionOnScreen(event).cursorPositionY,
        width: 200,
        height: 200
      }
    });

    setObjects(objectsWithUpdate);
    console.log('Objetos ', objectsWithUpdate);
  }

  function handleStartManipulation(event: React.MouseEvent, manipulation: string) {
    if (toolSelected !== 'Cursor') return
    setStateManipulation({
      manipulation,
      cursorPositionX: calcCursorPositionOnScreen(event).cursorPositionX,
      cursorPositionY: calcCursorPositionOnScreen(event).cursorPositionY,
    });
    setIsManipulating(true);
  }

  function handleManipulation(event: React.MouseEvent) {
    if (!isManipulating || typeof manipulations[stateManipulation.manipulation] != 'function') return;

    const cursorPosition = {
      X: calcCursorPositionOnScreen(event).cursorPositionX,
      Y: calcCursorPositionOnScreen(event).cursorPositionY,
    }

    const updateObjectState = manipulations[stateManipulation.manipulation]({ stateObject, cursorPosition });

    const objectsUpdate = objects.slice();
    objectsUpdate[objectIdentify].state = updateObjectState;
    setObjects(objectsUpdate);

    // if (toolSelected === 'Square' && screenRef.current) {
    //   const screen = screenRef.current;
    //   const context = screen.getContext('2d');

    //   if (!context) return;
    //   Rect(
    //     context,
    //     { x: stateManipulation.cursorPositionX, y: stateManipulation.cursorPositionY },
    //     { x: width, y: height },
    //     '#AA88FF'
    //   );
    // }
  }

  function handleFinishManipulation() {
    setIsManipulating(false);
  }

  function handleKeyPressed(event: React.KeyboardEvent<HTMLDivElement>) {

    const keyEventProps = {
      keyPressed: event.key,
      isKeyCtrl: event.ctrlKey,
      isKeyShift: event.shiftKey,
      isKeyAlt: event.altKey
    }
    setKeysPressed(keyEventProps);
  }

  function handleKeyDespressed(event: React.KeyboardEvent<HTMLDivElement>) {
    const keyEventProps = {
      keyPressed: '',
      isKeyCtrl: false,
      isKeyShift: false,
      isKeyAlt: false
    }
    setKeysPressed(keyEventProps);
  }

  function isCtrlAndShiftKeysPressed() {
    return (keysPressed.isKeyCtrl && keysPressed.isKeyShift && keysPressed.keyPressed === '');
  }

  return (
    <Wrapper>
      <Container
        onClick={handleScreenClick}
        onMouseMove={handleManipulation}
        onMouseUp={handleFinishManipulation}
        onKeyDown={handleKeyPressed}
        onKeyUp={handleKeyDespressed}
        tabIndex={0}
        screen={{ width: screenWidth, height: screenHeight }}
      >
        {objects.map((object, index) => {
          return (
            <ManipulationBorder
              key={index}
              objectIdentify={index}
              show={object.selected}
              objectStylePropties={object.state}
              startMoveManipulation={event => handleStartManipulation(event, 'move')}
              startResizeUpManipulation={event => handleStartManipulation(event, 'resizeUp')}
              startResizeDownManipulation={event => handleStartManipulation(event, 'resizeDown')}
              startResizeLeftManipulation={event => handleStartManipulation(event, 'resizeLeft')}
              startResizeRightManipulation={event => handleStartManipulation(event, 'resizeRight')}
              startResizeLeftUpManipulation={event => handleStartManipulation(event, 'resizeLeftUp')}
              startResizeRightUpManipulation={event => handleStartManipulation(event, 'resizeRightUp')}
              startResizeRightDownManipulation={event => handleStartManipulation(event, 'resizeRightDown')}
              startResizeLeftDownManipulation={event => handleStartManipulation(event, 'resizeLeftDown')}
              setShowManipulation={() => handleSelectObject(index)}
            >
              {object.componentToRender}

            </ManipulationBorder>
          )
        }
        )}
      </Container>
    </Wrapper >
  );
}

export default Screen;