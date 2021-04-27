import React from 'react';

import { Container } from './styles';
import { ObjectComponent } from '../ObjectPorpties';

function diferenceByPorcentage(percentage: number, value: number) {
  return (value / 100) * percentage;
}

export const Triangle: ObjectComponent = (props) => {
  const height =
    props.size.height - diferenceByPorcentage(31.799, props.size.height);

  return (
    <Container
      position={props.position}
      size={props.size}
      objectStyle={props.style}
      onClick={() => props.onClick(props.objectIdentify)}
      onDoubleClick={() => props.onDoubleClick(props.objectIdentify)}
    >
      <polygon
        points={`
            ${props.size.width / 2},${props.style.border.width || 0}
            ${props.size.width - (props.style.border.width || 0)},${
          height - (props.style.border.width || 0)
        }
            ${props.style.border.width || 0},${
          height - (props.style.border.width || 0)
        }
          `}
        fill={props.style.background.color}
        stroke={props.style.border.color}
        strokeWidth={props.style.border.width}
      />
    </Container>
  );
};
