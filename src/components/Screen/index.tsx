import React, { useEffect, useRef, useState } from 'react';
import { theme } from '../../styles/theme';
import { useEditorContext, useProjectTreeContext, useAppContext } from '../../contexts';

import { Container, Wrapper } from './styles';
import { Triangle, Rectangle, Circle, Button, BarGraph } from '../../projectObjects/index';

import ManipulationBorder from '../ManipulationBorder';
import { manipulations } from '../../core/object/manipulations/moveAndResizeManipulations';
import { ObjectComponent, ObjectStylePropties } from '../../projectObjects/ObjectPorpties';
import InsertingObjectArea from '../InsertingObjectArea';
import ModalProptiesObject from '../ModalProptiesObject';

import { useAppSelector } from '../../store';

type ObjectComponentToRender = ObjectComponent;

interface Object {
  selected: boolean,
  editingPropties: boolean,
  componentToRender: ObjectComponentToRender
  state: {
    positionX: number,
    positionY: number,
    width: number,
    height: number,
  }
  style: ObjectStylePropties
}

const ObjectsComponentsRender: { [key: string]: ObjectComponent } = {
  'Rectangle': Rectangle,
  'Circle': Circle,
  'Triangle': Triangle,
  'Button': Button,
  'BarGraph': BarGraph
}


const Screen: React.FC = () => {

  const objects = useAppSelector(state => state.objects)

  const [screenWidth, setScreenWdth] = useState(1366);
  const [screenHeight, setScreenHeight] = useState(768);
  const [isManipulating, setIsManipulating] = useState(false);

  const [stateManipulation, setStateManipulation] = useState({
    manipulation: '',
    cursorPositionX: 0,
    cursorPositionY: 0
  });

  const [stateInsertObject, setStateInsertObject] = useState({
    cursorPositionX: 0,
    cursorPositionY: 0
  });

  const [startManipulations, setStartManipulations] = useState([] as boolean[]);
  const [objectIdentify, setObjectIdentify] = useState(-1);
  const [insertingtObjectAreaState, setinsertingtObjectAreaState] = useState({
    isInserting: false,
    positionX: 0,
    positionY: 0,
    width: 0,
    height: 0
  });

  const [showCursorObject, setShowCursorObject] = useState(false);

  const { keysPressed, setKeysPressed } = useAppContext();
  const { containerWidth } = useProjectTreeContext();

  function calcCursorPositionOnScreen(positionX: number, positionY: number) {
    const cursorPositionX = positionX - containerWidth
    const cursorPositionY = positionY - parseInt(theme.headerHeight)

    return { cursorPositionX, cursorPositionY };
  }

  interface RegionPropties { X: number, Y: number, width: number, height: number }

  function cursorInScreenRegion(regionPropties: RegionPropties, cursorPositionX: number, cursorPositionY: number) {
    const regionXStartObject = regionPropties.X;
    const regionXEndObject = regionPropties.X + regionPropties.width;
    const regionYStartObject = regionPropties.Y;
    const regionYEndObject = regionPropties.Y + regionPropties.height;

    const cursorIsInsideRegigionX = (cursorPositionX >= regionXStartObject && cursorPositionX <= regionXEndObject)
    const cursorIsInsideRegionY = (cursorPositionY >= regionYStartObject && cursorPositionY <= regionYEndObject)

    return (cursorIsInsideRegigionX && cursorIsInsideRegionY);
  }

  function cursorOnInObject(objects: Object[], mouseEvent: React.MouseEvent) {
    const { cursorPositionX, cursorPositionY } = calcCursorPositionOnScreen(mouseEvent.clientX, mouseEvent.clientY);
    let cursorIsOnInObject = false;

    objects.forEach(object => {

      const regionPropties = {
        X: object.state.positionX,
        Y: object.state.positionY,
        width: object.state.width,
        height: object.state.height
      }

      const cursorInObjectRegion = cursorInScreenRegion(regionPropties, cursorPositionX, cursorPositionY);

      cursorIsOnInObject = cursorInObjectRegion;
    })

    return cursorIsOnInObject;

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

  const Component = ObjectsComponentsRender['rect'];

  return (
    <Wrapper>
      <Container
        onKeyDown={handleKeyPressed}
        onKeyUp={handleKeyDespressed}
        tabIndex={0}
        screen={{ width: screenWidth, height: screenHeight }}
        showCursorObject={showCursorObject}
      >
        {objects.map((object, index) => {
          return (
            <>
              <ManipulationBorder
                key={index}
                objectId={index}
                show={object.selected}
                position={object.position}
                size={object.size}
                manipulateObject={() => {}}
              >
               <Component
                position={object.position}
                size={object.size}
                objectIdentify={index}
                style={object.style}
                onClick={() => {}}
                onDoubleClick={() => {}}
              />
              </ManipulationBorder>
              {object.editingPropties &&
                <ModalProptiesObject objectId={index} />
              }
            </>
          )
        }
        )}
        {insertingtObjectAreaState.isInserting &&
          <InsertingObjectArea InsertingObjectAreaState={insertingtObjectAreaState} />
        }
      </Container>
    </Wrapper >
  );
}

export default Screen;