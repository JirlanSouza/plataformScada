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
  startMoveManipulation: (event: React.MouseEvent) => void,
  startResizeUpManipulation: (event: React.MouseEvent) => void,
  startResizeDownManipulation: (event: React.MouseEvent) => void,
  startResizeLeftManipulation: (event: React.MouseEvent) => void,
  startResizeRightManipulation: (event: React.MouseEvent) => void,
  startResizeLeftUpManipulation: (event: React.MouseEvent) => void,
  startResizeRightUpManipulation: (event: React.MouseEvent) => void,
  startResizeRightDownManipulation: (event: React.MouseEvent) => void,
  startResizeLeftDownManipulation: (event: React.MouseEvent) => void,
  setShowManipulation: (identify: number) => void,
  setShowProptiesEdit: (identify: number) => void
}

const ManipulationBorder: React.FC<ManipulationBorderPropties> = ({
  objectIdentify,
  children,
  show,
  objectPositionAndSize,
  objectStyle,
  startMoveManipulation,
  startResizeUpManipulation,
  startResizeDownManipulation,
  startResizeLeftManipulation,
  startResizeRightManipulation,
  startResizeLeftUpManipulation,
  startResizeRightUpManipulation,
  startResizeRightDownManipulation,
  startResizeLeftDownManipulation,
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
            <LeftUp onMouseDown={startResizeLeftUpManipulation} />
            <Up onMouseDown={startResizeUpManipulation}/>
            <RightUp onMouseDown={startResizeRightUpManipulation} />
          </Top>

          <Center>
            <Left onMouseDown={startResizeLeftManipulation} />
            <FiMove size={24} onMouseDown={startMoveManipulation} />
            <Right onMouseDown={startResizeRightManipulation} />
          </Center>

          <Base>
            <LeftDown onMouseDown={startResizeLeftDownManipulation} />
            <Down onMouseDown={startResizeDownManipulation} />
            <RightDown onMouseDown={startResizeRightDownManipulation} />
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