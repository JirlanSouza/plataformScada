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
  Up,
} from './styles';

interface ManipulationBorderPropties {
  objectId: number;
  show: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  manipulateObject: (
    manipulationName: string,
    cursorPosition: { x: number; y: number }
  ) => void;
}

const ManipulationBorder: React.FC<ManipulationBorderPropties> = ({
  objectId,
  children,
  show,
  position,
  size,
  manipulateObject,
}) => {
  return (
    <>
      {show && (
        <Container position={position} size={size}>
          <Top>
            <LeftUp
              onMouseDown={(event) =>
                manipulateObject('resizeLeftUp', {
                  x: event.clientX,
                  y: event.clientY,
                })
              }
            />
            <Up
              onMouseDown={(event) =>
                manipulateObject('resizeUp', {
                  x: event.clientX,
                  y: event.clientY,
                })
              }
            />
            <RightUp
              onMouseDown={(event) =>
                manipulateObject('resizeRightUp', {
                  x: event.clientX,
                  y: event.clientY,
                })
              }
            />
          </Top>

          <Center>
            <Left
              onMouseDown={(event) =>
                manipulateObject('resizeLeft', {
                  x: event.clientX,
                  y: event.clientY,
                })
              }
            />
            <FiMove
              size={24}
              onMouseDown={(event) =>
                manipulateObject('move', { x: event.clientX, y: event.clientY })
              }
            />
            <Right
              onMouseDown={(event) =>
                manipulateObject('resizeRight', {
                  x: event.clientX,
                  y: event.clientY,
                })
              }
            />
          </Center>

          <Base>
            <LeftDown
              onMouseDown={(event) =>
                manipulateObject('resizeLeftDown', {
                  x: event.clientX,
                  y: event.clientY,
                })
              }
            />
            <Down
              onMouseDown={(event) =>
                manipulateObject('resizeDown', {
                  x: event.clientX,
                  y: event.clientY,
                })
              }
            />
            <RightDown
              onMouseDown={(event) =>
                manipulateObject('resizeRightDown', {
                  x: event.clientX,
                  y: event.clientY,
                })
              }
            />
          </Base>
        </Container>
      )}
      {children}
    </>
  );
};

export default ManipulationBorder;
