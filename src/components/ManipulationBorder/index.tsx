import React from 'react';
import { FiMove } from 'react-icons/fi';

import { Base, Center, Container, Down, Left, LeftDown, LeftUp, Right, RightDown, RightUp, Top, Up } from './styles';

interface ManipulationBorderPropties {
  show: boolean,
  positionAndWeight: {
    x: number,
    y: number,
    width: number,
    height: number
  },
  startManipulation: (event: React.MouseEvent) => void
}

const ManipulationBorder: React.FC<ManipulationBorderPropties> = ({
  children,
  show,
  positionAndWeight,
  startManipulation
}) => {
  return (
    <>
      {show &&
        <Container
        x={positionAndWeight.x}
        y={positionAndWeight.y}
        width={positionAndWeight.width}
        height={positionAndWeight.height}
        >

          <Top>
            <LeftUp />
            <Up />
            <RightUp />
          </Top>

          <Center>
            <Left />
            <FiMove size={24} onMouseDown={startManipulation}/>
            <Right />
          </Center>

          <Base>
            <LeftDown />
            <Down />
            <RightDown />
          </Base>

        </Container>
      }
      { children}
    </>
  );
}

export default ManipulationBorder;