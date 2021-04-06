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

interface ObjectStylePropties {
  positionX: number,
  positionY: number,
  width: number,
  height: number
}

interface ManipulationBorderPropties {
  children: React.FC<{objectStylePropties: ObjectStylePropties, onClick: () => void}>;
  show: boolean,
  objectStylePropties: ObjectStylePropties,
  startMoveManipulation: (event: React.MouseEvent) => void,
  startResizeUpManipulation: (event: React.MouseEvent) => void,
  startResizeDownManipulation: (event: React.MouseEvent) => void,
  startResizeLeftManipulation: (event: React.MouseEvent) => void,
  startResizeRightManipulation: (event: React.MouseEvent) => void,
  setShowManipulation: () => void
}

const ManipulationBorder: React.FC<ManipulationBorderPropties> = ({
  children,
  show,
  objectStylePropties,
  startMoveManipulation,
  startResizeUpManipulation,
  startResizeDownManipulation,
  startResizeLeftManipulation,
  startResizeRightManipulation,
  setShowManipulation
}) => {
  return (
    <>
      {show &&
        <Container
          positionX={objectStylePropties.positionX}
          positionY={objectStylePropties.positionY}
          width={objectStylePropties.width}
          height={objectStylePropties.height}
        >

          <Top>
            <LeftUp />
            <Up onMouseDown={startResizeUpManipulation}/>
            <RightUp />
          </Top>

          <Center>
            <Left onMouseDown={startResizeLeftManipulation} />
            <FiMove size={24} onMouseDown={startMoveManipulation} />
            <Right onMouseDown={startResizeRightManipulation} />
          </Center>

          <Base>
            <LeftDown />
            <Down onMouseDown={startResizeDownManipulation} />
            <RightDown />
          </Base>

        </Container>
      }
      {children({objectStylePropties, onClick: setShowManipulation})}
    </>
  );
}

export default ManipulationBorder;