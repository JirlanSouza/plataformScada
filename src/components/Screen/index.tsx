import React, { useEffect, useState } from 'react';
import { theme } from '../../styles/theme';
import { useProjectTreeContext, useAppContext, useEditorContext } from '../../contexts';

import { Container, Wrapper } from './styles';
import { ObjectsComponentsRender } from '../../projectObjects/index';

import ManipulationBorder from '../ManipulationBorder';
import InsertingObjectArea from '../InsertingObjectArea';
import ModalProptiesObject from '../ModalProptiesObject';

import { useAppSelector, useAppDispatch } from '../../store';
import { selectObject, unSelectObject, manipulateObject, addObject, removeObject, editingProptiesObject } from '../../store/Object'
import { startManipulation, stopManipulation } from '../../store/Editor';
import { calcSizeFromPreviousPosition } from '../../utils/size';

const Screen: React.FC = () => {

  const dispatch = useAppDispatch();

  const objects = useAppSelector(state => state.objects)
  const editor = useAppSelector(state => state.editor)

  const [screenWidth, setScreenWdth] = useState(1366);
  const [screenHeight, setScreenHeight] = useState(768);

  const [insertingtObjectAreaState, setInsertingtObjectAreaState] = useState({
    isInserting: false,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 0,
      height: 0
    }
  });

  const { appKeyPressedEvent, appKeyEventSubcribe } = useAppContext();
  const { containerWidth } = useProjectTreeContext();
  const { toolSelected } = useEditorContext();

  useEffect(() => {
    appKeyEventSubcribe({
      keyEvent: 'Delete',
      fn: () => {
        dispatch(removeObject())
      }
    }
    )
  }, []);

  function calcCursorPositionOnScreen(positionX: number, positionY: number) {
    const cursorPositionX = positionX - containerWidth
    const cursorPositionY = positionY - parseInt(theme.headerHeight)

    return { x: cursorPositionX, y: cursorPositionY };
  }

  function handleKeyPressed(event: React.KeyboardEvent<HTMLDivElement>) {

    const keyEventProps = {
      keyPressed: event.key,
      isKeyCtrl: event.ctrlKey,
      isKeyShift: event.shiftKey,
      isKeyAlt: event.altKey
    }
    appKeyPressedEvent(keyEventProps);
  }

  function handleKeyDespressed(event: React.KeyboardEvent<HTMLDivElement>) {
    const keyEventProps = {
      keyPressed: '',
      isKeyCtrl: false,
      isKeyShift: false,
      isKeyAlt: false
    }
    //appKeyPressedEvent(keyEventProps);
  }

  function handleMouseDown(event: React.MouseEvent) {
    if (toolSelected !== 'Cursor') {
      setInsertingtObjectAreaState({
        ...insertingtObjectAreaState,
        isInserting: true,
        position: calcCursorPositionOnScreen(event.clientX, event.clientY)
      })
    }
  }

  function handleSelectObject(id: number) {
    if (toolSelected !== 'Cursor') return;

    dispatch(selectObject({ id }));
  }

  function handleStartManipulation(objectId: number, manipulation: string, cursorPosition: { x: number, y: number }) {
    if (toolSelected !== 'Cursor') return;

    dispatch(
      startManipulation({
        objectSelected: objectId,
        manipulation,
        position: calcCursorPositionOnScreen(cursorPosition.x, cursorPosition.y)
      }))
  }

  function handleMouseMove(event: React.MouseEvent) {


    if (editor.manipulating) {
      const maniputionPropties = {
        id: editor.initialStateOfManipulation.objectSelected,
        manipulation: editor.initialStateOfManipulation.manipulation,
        cursorPosition: calcCursorPositionOnScreen(event.clientX, event.clientY)
      }

      dispatch(manipulateObject(maniputionPropties));
    }

    if (toolSelected !== 'Cursor' && insertingtObjectAreaState.isInserting) {
      const currentPosition = calcCursorPositionOnScreen(event.clientX, event.clientY);

      setInsertingtObjectAreaState({
        ...insertingtObjectAreaState,
        size: calcSizeFromPreviousPosition(
          insertingtObjectAreaState.position,
          currentPosition
        )
      })
    }
  }

  function handleObjectDoubleClick (objectId: number) {
    dispatch(editingProptiesObject(objectId));
  }

  function handleMouseUp() {
    if (editor.manipulating) {
      dispatch(stopManipulation());
    }

    if (toolSelected !== 'Cursor' && insertingtObjectAreaState.isInserting) {
      dispatch(addObject({
        type: toolSelected,
        position: insertingtObjectAreaState.position,
        size: insertingtObjectAreaState.size
      }))

      setInsertingtObjectAreaState({
        ...insertingtObjectAreaState,
        isInserting: false,
        size: {
          width: 0,
          height: 0
        }
      })
    }
  }

  function handleClick(event: React.MouseEvent) {
    if (objects.hasObjectsSelecteds) {
      dispatch(unSelectObject({
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
        showCursorObject={toolSelected !== 'Cursor'}
        onMouseDown={handleMouseDown}
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
                  (manipulation, cursorPosition) => handleStartManipulation(index, manipulation, cursorPosition)
                }
              >
                <ObjectComponent
                  position={object.position}
                  size={object.size}
                  objectIdentify={index}
                  style={object.style}
                  onClick={() => handleSelectObject(index)}
                  onDoubleClick={() => handleObjectDoubleClick(index)}
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