import React, { useEffect, useRef, useState } from 'react';
import { theme } from '../../styles/theme';
import { useEditorContext, useProjectTreeContext, useAppContext } from '../../contexts';

import { Container, Wrapper } from './styles';
import { Triangle, Rectangle, Circle, Button, BarGraph } from '../../projectObjects/index';

import ManipulationBorder from '../ManipulationBorder';
import { manipulations } from '../../core/object/manipulations/moveAndResizeManipulations';
import { ObjectComponent, ObjectStylePropties } from '../../projectObjects/ObjectPorpties';
import InsertingObjectArea from '../InsertingObjectArea';
import ModalProptiesObject, { ObjectProptiesToEdit } from '../ModalProptiesObject';

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

const objectsComponentsRender: { [key: string]: ObjectComponentToRender } = {
  'Rectangle': Rectangle,
  'Circle': Circle,
  'Triangle': Triangle,
  'Button': Button,
  'BarGraph': BarGraph
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

  const [objects, setObjects] = useState([] as Object[]);
  const [showCursorObject, setShowCursorObject] = useState(false);

  const [objectProptiesToEdit, setObjectProptiesToEdit] = useState([] as ObjectProptiesToEdit[]);
  const [isDoubleClick, setIsDoubleClick] = useState(false);;

  useEffect(() => {

  }, [isDoubleClick])

  const { appClickEvent, keysPressed, setKeysPressed } = useAppContext()
  const { toolSelected } = useEditorContext();
  const { containerWidth } = useProjectTreeContext();

  useEffect(() => {
    if (objectIdentify !== -1) return;
    const objectsUpdate = objects.slice();


    objectsUpdate.forEach((object, index) => {
      objectsUpdate[index].selected = false;
    });
    setObjects(objectsUpdate);

  }, [objectIdentify]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keysPressed.keyPressed === 'delete') return;
    const objectsUpdate = objects.slice();



    delete objectsUpdate[objectIdentify];

    setObjects(objectsUpdate);

  }, [keysPressed]); // eslint-disable-line react-hooks/exhaustive-deps

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

  function handleStartInsertObject(event: React.MouseEvent) {
    if (toolSelected === 'Cursor') return;
    const cursorPosition = calcCursorPositionOnScreen(event.clientX, event.clientY)

    setStateInsertObject(cursorPosition);
    setinsertingtObjectAreaState({
      isInserting: true,
      positionX: cursorPosition.cursorPositionX,
      positionY: cursorPosition.cursorPositionY,
      width: 0,
      height: 0
    });


  }

  function handleFinishInsertObject(event: React.MouseEvent) {
    if (toolSelected === 'Cursor') return;
    handleIsertObject(event);
    setinsertingtObjectAreaState({
      ...insertingtObjectAreaState,
      isInserting: false,
    });
  }

  function handleScreenClick(event: React.MouseEvent) {

    const regionPropties = {
      X: 300,
      Y: 80,
      width: 400,
      height: 500
    }

    const cursorInEditProptiesObject = cursorInScreenRegion(regionPropties, event.pageX, event.pageY)
    if (!cursorInEditProptiesObject) {
      appClickEvent(event);
    }

    if (startManipulations && !isManipulating && !cursorOnInObject(objects, event)) {
      const objectsUpdate = objects.slice();
      objectsUpdate.forEach((object, index) => {
        objectsUpdate[index].selected = false;
        if (!cursorInEditProptiesObject) {
          objectsUpdate[index].editingPropties = false;
        }
      })

      setObjects(objectsUpdate);
      setObjectIdentify(-1);
    }
  }

  function handleSelectObject(identify: number) {
    console.log('OBJECTS ===>>>', objects);
    console.log('SELECT OBJECT =====>>>', identify, !startManipulations[identify], !isManipulating);
    if (!startManipulations[identify] && !isManipulating && toolSelected === 'Cursor') {
      const objectsUpdate = objects.slice();

      if (!isCtrlAndShiftKeysPressed()) {
        objectsUpdate.forEach((object, index) => {
          objectsUpdate[index].selected = false;
        });
      }
      objectsUpdate[1].selected = true;

      setObjects(objectsUpdate);
      setObjectIdentify(identify);
      console.log('OBJECTS 2 ===>>>', objects, objectsUpdate);
    }
  }

  function handleObjectDoubleClick(identfy: number) {
    objects[identfy].editingPropties = true;
    setObjects([...objects])
  }

  function handleIsertObject(event: React.MouseEvent) {
    if (typeof objectsComponentsRender[toolSelected] !== 'function') return

    const objectsWithUpdate = objects.slice();
    objectsWithUpdate.push({
      selected: false,
      editingPropties: false,
      componentToRender: objectsComponentsRender[toolSelected],
      state: {
        positionX: stateInsertObject.cursorPositionX,
        positionY: stateInsertObject.cursorPositionY,
        width: calcCursorPositionOnScreen(event.clientX, event.clientY).cursorPositionX - stateInsertObject.cursorPositionX,
        height: calcCursorPositionOnScreen(event.clientX, event.clientY).cursorPositionY - stateInsertObject.cursorPositionY
      },
      style: {
        font: {
          size: 0,
          color: '',
          bold: false,
          italic: false
        },
        background: {
          color: '#DD55EE'
        },
        border: {
          color: '',
          style: '',
          width: 0
        }
      }
    });

    setObjects(objectsWithUpdate);
  }

  function mapObjectStateToObjectProptiesEdit(object: Object): ObjectProptiesToEdit {

    const objectProptiesToEdit = {
      style: object.style,
      comon: {
        positionAndSize: object.state
      },
      conection: {
        tag: ''
      },
    }

    return objectProptiesToEdit;
  }

  function mapSetSetObjectStateFromObjectProptiesEdit(objectProptiesEdit: ObjectProptiesToEdit, index: number) {
    const objectsUpdate = objects

    if (objectProptiesEdit.style.font) {
      objectsUpdate[index].style.font = objectProptiesEdit.style.font
    }

    if (objectProptiesEdit.style.background) {
      objectsUpdate[index].style.background = objectProptiesEdit.style.background
    }

    if (objectProptiesEdit.style.border) {
      objectsUpdate[index].style.border = objectProptiesEdit.style.border
    }

    objectsUpdate[index] = {
      ...objectsUpdate[index],
      state: objectProptiesEdit.comon.positionAndSize
    }

    setObjects(objectsUpdate);
  }

  function handleStartManipulation(manipulation: string, positionX: number, positionY: number) {
    if (toolSelected !== 'Cursor') return
    const { cursorPositionX, cursorPositionY } = calcCursorPositionOnScreen(positionX, positionY)
    setStateManipulation({
      manipulation,
      cursorPositionX,
      cursorPositionY
    });
    setIsManipulating(true);
  }

  function handleManipulation(event: React.MouseEvent) {
    if (toolSelected !== 'Cursor') {
      if (!showCursorObject) setShowCursorObject(true);
    } else {
      setShowCursorObject(false);
    }

    const { cursorPositionX, cursorPositionY } = calcCursorPositionOnScreen(event.clientX, event.clientY);
    const cursorPosition = {
      X: cursorPositionX,
      Y: cursorPositionY,
    }

    if (insertingtObjectAreaState.isInserting) {
      setinsertingtObjectAreaState({
        ...insertingtObjectAreaState,
        width: cursorPosition.X - insertingtObjectAreaState.positionX,
        height: cursorPosition.Y - insertingtObjectAreaState.positionY
      });
    }

    if (
      !isManipulating ||
      typeof manipulations[stateManipulation.manipulation] != 'function' ||
      objectIdentify === -1
    ) return;

    const state = objects[objectIdentify].state
    const updateObjectState = manipulations[stateManipulation.manipulation]({ stateObject: state, cursorPosition });

    const objectsUpdate = objects.slice();
    objectsUpdate[objectIdentify].state = updateObjectState;
    setObjects(objectsUpdate);
  }

  function handleOnMouseUpScreen(event: React.MouseEvent) {
    if (toolSelected !== 'Curssor') {
      handleFinishInsertObject(event)
    }

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
        onMouseDown={handleStartInsertObject}
        onMouseUp={handleOnMouseUpScreen}
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
                objectIdentify={index}
                show={!!object.selected}
                objectPositionAndSize={object.state}
                objectStyle={object.style}
                manipulateObject={event => handleStartManipulation}
                setShowManipulation={() => handleSelectObject(index)}
                setShowProptiesEdit={() => handleObjectDoubleClick(index)}
              >
                {object.componentToRender}
              </ManipulationBorder>
              {objects[index].editingPropties &&
                <ModalProptiesObject
                  setPropties={mapObjectStateToObjectProptiesEdit(object)}
                  getPropties={(propties) => mapSetSetObjectStateFromObjectProptiesEdit(propties, index)} />
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