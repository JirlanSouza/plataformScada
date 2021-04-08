import React from 'react';

import { Container } from './styles';
import { ObjectComponent } from '../ObjectPorpties';

function diferenceByPorcentage (percentage: number, value: number) {
  return ((value / 100) * percentage);
}

export const Triangle: ObjectComponent = (props) => {
  const height = props.objectStylePropties.height - diferenceByPorcentage(31.799, props.objectStylePropties.height)

  return (
    <Container
      objectStylePropties={props.objectStylePropties}
      onClick={() => props.onClick(props.objectIdentify)}
    >
        <polygon
          points={`
            ${props.objectStylePropties.width / 2},0
            ${props.objectStylePropties.width},${height}
            0,${height}
          `}
          fill="#0562DC"
          stroke="#000"
          stroke-width="4"
        />
    </Container>
  );
}
