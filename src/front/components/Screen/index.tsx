import React, { useEffect, useState } from 'react';
import { theme } from '../../styles/theme';
import {
  useProjectTreeContext,
  useAppContext,
  useEditorContext,
} from '../../contexts';

import { Container, Wrapper } from './styles';
import { ObjectsComponentsRender } from '../../projectObjects/index';

import ManipulationBorder from '../ManipulationBorder';
import InsertingObjectArea from '../InsertingObjectArea';
import ModalProptiesObject from '../ModalProptiesObject';

import { useAppSelector, useAppDispatch } from '../../store';
import { screenActions } from '../../store/screens';
import { startManipulation, stopManipulation } from '../../store/Editor';
import { calcSizeFromPreviousPosition } from '../../utils/size';

const Screen: React.FC<{ screenId: number }> = (props) => {
  const dispatch = useAppDispatch();

  const editor = useAppSelector((state) => state.editor);
  const screen = useAppSelector((state) => state.screens.items[props.screenId]);
  const objects = useAppSelector(
    (state) => state.screens.items[props.screenId].objects
  );

  const [insertingtObjectAreaState, setInsertingtObjectAreaState] = useState({
    isInserting: false,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
  });

  const [screenMouseUp, setScreenMouseUp] = useState(false);
  const [screenMouseMove, setScreenMouseMove] = useState({ x: 0, y: 0 });

  const { appKeyPressedEvent, appKeyEventSubcribe } = useAppContext();
  const { containerWidth } = useProjectTreeContext();
  const { toolSelected } = useEditorContext();

  useEffect(() => {
    appKeyEventSubcribe({
      keyEvent: 'Delete',
      fn: () => {
        dispatch(screenActions.removeObject());
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function calcSizeRenderScrenByEditorZoom() {
    const width = (screen.size.width / 100) * editor.zoom;
    const height = (screen.size.height / 100) * editor.zoom;

    return { width, height };
  }

  function calcPositionRenderByEditorZoom(position: { x: number; y: number }) {
    const x = (position.x / 100) * editor.zoom;
    const y = (position.y / 100) * editor.zoom;

    return { x, y };
  }

  function calcCursorPositionInScreenByEditorZoom(position: {
    x: number;
    y: number;
  }) {
    const x = position.x + (position.x / 100) * (100 - editor.zoom);
    const y = position.y + (position.y / 100) * (100 - editor.zoom);

    return { x, y };
  }

  function calcSizeRenderByEditorZoom(size: { width: number; height: number }) {
    const width = (size.width / 100) * editor.zoom;
    const height = (size.height / 100) * editor.zoom;

    return { width, height };
  }

  function calcCursorPositionOnScreen(position: { x: number; y: number }) {
    const cursorPositionX = position.x - containerWidth;
    const cursorPositionY = position.y - parseInt(theme.headerHeight, 10);

    return { x: cursorPositionX, y: cursorPositionY };
  }

  function handleKeyPressed(event: React.KeyboardEvent<HTMLDivElement>) {
    const keyEventProps = {
      keyPressed: event.key,
      isKeyCtrl: event.ctrlKey,
      isKeyShift: event.shiftKey,
      isKeyAlt: event.altKey,
    };
    appKeyPressedEvent(keyEventProps);
  }

  function handleKeyDespressed() {
    const keyEventProps = {
      keyPressed: '',
      isKeyCtrl: false,
      isKeyShift: false,
      isKeyAlt: false,
    };
    appKeyPressedEvent(keyEventProps);
  }

  function handleMouseDown(event: React.MouseEvent) {
    if (toolSelected !== 'Cursor') {
      setInsertingtObjectAreaState({
        ...insertingtObjectAreaState,
        isInserting: true,
        position: calcCursorPositionOnScreen({
          x: event.clientX,
          y: event.clientY,
        }),
      });
    }
  }

  function handleSelectObject(id: number) {
    if (toolSelected !== 'Cursor' || objects.hasObjectsEditingsPropties) return;

    dispatch(screenActions.selectObject({ id }));
  }

  function handleStartManipulation(
    objectId: number,
    manipulation: string,
    cursorPosition: { x: number; y: number }
  ) {
    if (toolSelected !== 'Cursor') return;

    dispatch(
      startManipulation({
        objectSelected: objectId,
        manipulation,
        position: calcCursorPositionOnScreen({
          x: cursorPosition.x,
          y: cursorPosition.y,
        }),
      })
    );
  }

  function handleMouseMove(event: React.MouseEvent) {
    setScreenMouseMove({ x: event.clientX, y: event.clientY });

    if (editor.manipulating) {
      const manipulationPropties = {
        id: editor.initialStateOfManipulation.objectSelected,
        manipulation: editor.initialStateOfManipulation.manipulation,
        cursorPosition: calcCursorPositionOnScreen(
          calcCursorPositionInScreenByEditorZoom({
            x: event.clientX,
            y: event.clientY,
          })
        ),
      };
      console.log(
        'Teste',
        calcPositionRenderByEditorZoom(manipulationPropties.cursorPosition).x,
        calcCursorPositionOnScreen({
          x: event.clientX,
          y: event.clientY,
        }).x
      );
      dispatch(screenActions.manipulateObject(manipulationPropties));
    }

    if (toolSelected !== 'Cursor' && insertingtObjectAreaState.isInserting) {
      const currentPosition = calcCursorPositionOnScreen({
        x: event.clientX,
        y: event.clientY,
      });

      setInsertingtObjectAreaState({
        ...insertingtObjectAreaState,
        size: calcSizeFromPreviousPosition(
          insertingtObjectAreaState.position,
          currentPosition
        ),
      });
    }
  }

  function handleObjectDoubleClick(objectId: number) {
    if (objects.hasObjectsEditingsPropties) return;
    dispatch(screenActions.editingProptiesObject(objectId));
  }

  function handleMouseUp() {
    setScreenMouseUp(!screenMouseUp);

    if (editor.manipulating) {
      dispatch(stopManipulation());
    }

    if (toolSelected !== 'Cursor' && insertingtObjectAreaState.isInserting) {
      dispatch(
        screenActions.addObject({
          type: toolSelected,
          position: insertingtObjectAreaState.position,
          size: insertingtObjectAreaState.size,
        })
      );

      setInsertingtObjectAreaState({
        ...insertingtObjectAreaState,
        isInserting: false,
        size: {
          width: 0,
          height: 0,
        },
      });
    }
  }

  function handleClick(event: React.MouseEvent) {
    if (objects.hasObjectsSelecteds && !objects.hasObjectsEditingsPropties) {
      dispatch(
        screenActions.unSelectObject({
          cursorPosition: calcCursorPositionOnScreen({
            x: event.clientX,
            y: event.clientY,
          }),
        })
      );
    }
  }

  return (
    <Wrapper>
      <Container
        onKeyDown={handleKeyPressed}
        onKeyUp={handleKeyDespressed}
        tabIndex={0}
        screen={calcSizeRenderScrenByEditorZoom()}
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
                key={object.id}
                objectId={index}
                show={object.selected}
                position={calcPositionRenderByEditorZoom(object.position)}
                size={calcSizeRenderByEditorZoom(object.size)}
                manipulateObject={(manipulation, cursorPosition) =>
                  handleStartManipulation(
                    index,
                    manipulation,
                    calcCursorPositionInScreenByEditorZoom(cursorPosition)
                  )
                }
              >
                <ObjectComponent
                  position={calcPositionRenderByEditorZoom(object.position)}
                  size={calcSizeRenderByEditorZoom(object.size)}
                  objectIdentify={index}
                  style={object.style}
                  onClick={() => handleSelectObject(index)}
                  onDoubleClick={() => handleObjectDoubleClick(index)}
                />
              </ManipulationBorder>
              {object.editingPropties && (
                <ModalProptiesObject
                  objectId={index}
                  open={object.editingPropties}
                  screenMouseMove={screenMouseMove}
                  screenMouseUp={screenMouseUp}
                />
              )}
            </>
          );
        })}
        {insertingtObjectAreaState.isInserting && (
          <InsertingObjectArea
            InsertingObjectAreaState={insertingtObjectAreaState}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default Screen;
