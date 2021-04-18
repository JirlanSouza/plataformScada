import React from 'react';
import { FiMove } from 'react-icons/fi';

import {
  ObjectComponent,
  ObjectPositionAndSizePropties,
  ObjectStylePropties
} from '../../projectObjects/ObjectPorpties';

import {
  Base,
  Center,
  Container,
  Down,
  Left,
  LeftDown,
  LeftUp,
  Right,
  RightDown,
  RightUp,
  Top,
  Up
} from './styles';

type ManipulationChildren = ObjectComponent;

interface ManipulationBorderPropties {
  objectIdentify: number,
  children: ManipulationChildren;
  show: boolean,
  objectPositionAndSize: ObjectPositionAndSizePropties,
  objectStyle: ObjectStylePropties
  manipulateObject: (manipulationName: string, positionX: number, positionY: number) => void,
  setShowManipulation: (identify: number) => void,
  setShowProptiesEdit: (identify: number) => void
}

const ManipulationBorder: React.FC<ManipulationBorderPropties> = ({
  objectIdentify,
  children,
  show,
  objectPositionAndSize,
  objectStyle,
  manipulateObject,
  setShowManipulation,
  setShowProptiesEdit
}) => {
  return (
    <>
      {show &&
        <Container
          positionX={objectPositionAndSize.positionX}
          positionY={objectPositionAndSize.positionY}
          width={objectPositionAndSize.width}
          height={objectPositionAndSize.height}
        >

          <Top>
            <LeftUp onMouseDown={(event) => manipulateObject('resizeLeftUp', event.clientX, event.clientY)} />
            <Up onMouseDown={(event) => manipulateObject('resizeUp', event.clientX, event.clientY)} />
            <RightUp onMouseDown={(event) => manipulateObject('resizeRightUp', event.clientX, event.clientY)} />
          </Top>

          <Center>
            <Left onMouseDown={(event) => manipulateObject('resizeLeft', event.clientX, event.clientY)} />
            <FiMove size={24} onMouseDown={(event) => manipulateObject('move', event.clientX, event.clientY)} />
            <Right onMouseDown={(event) => manipulateObject('resizeRight', event.clientX, event.clientY)} />
          </Center>

          <Base>
            <LeftDown onMouseDown={(event) => manipulateObject('resizeLeftDown', event.clientX, event.clientY)} />
            <Down onMouseDown={(event) => manipulateObject('resizeDown', event.clientX, event.clientY)} />
            <RightDown onMouseDown={(event) => manipulateObject('resizeRightDown', event.clientX, event.clientY)} />
          </Base>

        </Container>
      }
      {children({
        objectIdentify,
        positionAndSize: objectPositionAndSize,
        style: objectStyle,
        onClick: setShowManipulation,
        onDoubleClick: setShowProptiesEdit
      })}
    </>
  );
}

export default ManipulationBorder;