import React from 'react';

import { Container } from './styles';
import { ObjectComponent } from '../ObjectPorpties';

function diferenceByPorcentage (percentage: number, value: number) {
  return ((value / 100) * percentage);
}

export const Triangle: ObjectComponent = (props) => {
  const height = props.positionAndSize.height - diferenceByPorcentage(31.799, props.positionAndSize.height)

  return (
    <Container
      positionAndSize={props.positionAndSize}
      objectStyle={props.style}
      onClick={() => props.onClick(props.objectIdentify)}
      onDoubleClick={() => props.onDoubleClick(props.objectIdentify)}
    >
        <polygon
          points={`
            ${props.positionAndSize.width / 2},0
            ${props.positionAndSize.width},${height}
            0,${height}
          `}
          fill={props.style.background.color}
          stroke={props.style.border.color}
          stroke-width={props.style.border.width}
        />
    </Container>
  );
}
