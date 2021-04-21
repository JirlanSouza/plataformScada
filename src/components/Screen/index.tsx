import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import { useProjectTreeContext, useAppContext } from '../../contexts';

import { Container, Wrapper } from './styles';
import { ObjectsComponentsRender } from '../../projectObjects/index';

import ManipulationBorder from '../ManipulationBorder';
import { ObjectComponent, ObjectStylePropties } from '../../projectObjects/ObjectPorpties';
import InsertingObjectArea from '../InsertingObjectArea';
import ModalProptiesObject from '../ModalProptiesObject';

import { useAppSelector, useAppDispatch } from '../../store';
import { select, manipulate, unSelect } from '../../store/Object'
import { selectedObject, startManipulation, stopManipulation, unSelectedObject } from '../../store/Editor';

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

const Screen: React.FC = () => {

  const dispatch = useAppDispatch();

  const objects = useAppSelector(state => state.objects)
  const editor = useAppSelector(state => state.editor)

  const [screenWidth, setScreenWdth] = useState(1366);
  const [screenHeight, setScreenHeight] = useState(768);

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

    return { x: cursorPositionX, y: cursorPositionY };
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

  function handleMouseMove(event: React.MouseEvent) {
    if (editor.manipulating) {
      const maniputionPropties = {
        id: editor.initialStateOfManipulation.objectSelected,
        manipulation: editor.initialStateOfManipulation.manipulation,
        cursorPosition: calcCursorPositionOnScreen(event.clientX, event.clientY)
      }

      dispatch(manipulate(maniputionPropties));
    }
  }

  function handleMouseUp() {
    if (editor.manipulating) {
      dispatch(stopManipulation());
    }
  }

  function handleClick(event: React.MouseEvent) {
    if (objects.hasObjectsSelecteds) {
      dispatch(unSelect({
        cursorPosition: calcCursorPositionOnScreen(event.clientX, event.clientY)
      }));
    }
  }

  return (
    <Wrapper>
      <Container
        onKeyDown={handleKeyPressed}
        onKeyUp={handleKeyDespressed}
        tabIndex={0}
        screen={{ width: screenWidth, height: screenHeight }}
        showCursorObject={showCursorObject}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      >
        {objects.items.map((object, index) => {
          const ObjectComponent = ObjectsComponentsRender[object.type];
          return (
            <>
              <ManipulationBorder
                key={index}
                objectId={index}
                show={object.selected}
                position={object.position}
                size={object.size}
                manipulateObject={
                  (manipulation, cursorPosition) => dispatch(
                    startManipulation({
                      objectSelected: index,
                      manipulation,
                      position: calcCursorPositionOnScreen(cursorPosition.x, cursorPosition.y)
                    }))}
              >
                <ObjectComponent
                  position={object.position}
                  size={object.size}
                  objectIdentify={index}
                  style={object.style}
                  onClick={() => { dispatch(select({ id: index }))}}
                  onDoubleClick={() => { }}
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