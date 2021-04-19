import React from 'react';
import { FiMove } from 'react-icons/fi';



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

interface ManipulationBorderPropties {
  objectId: number,
  show: boolean,
  position: { x: number, y: number },
  size: { width: number, height: number }
  manipulateObject: (manipulationName: string, positionX: number, positionY: number) => void,
}

const ManipulationBorder: React.FC<ManipulationBorderPropties> = ({
  objectId,
  children,
  show,
  position,
  size,
  manipulateObject
}) => {

  return (
    <>
      {show &&
        <Container
          position={position}
          size={size}
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
      {children}
    </>
  );
}

export default ManipulationBorder;