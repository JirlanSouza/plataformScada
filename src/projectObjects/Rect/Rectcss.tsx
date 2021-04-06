import React from 'react';

import { Container } from './styles';

interface ObjectStylePropties {
  positionX: number,
  positionY: number,
  width: number,
  height: number
}

const Rect: React.FC<{ objectStylePropties: ObjectStylePropties, onClick: () => void}> = (props) => {
  return (
    <Container objectStylePropties={props.objectStylePropties} onClick={props.onClick}>

    </Container>
  );
}

export default Rect;