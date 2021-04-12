import React from 'react';

import { Container } from './styles';
import { ObjectComponent } from '../ObjectPorpties';

export const Circle: ObjectComponent = (props) => {
  return (
    <Container
      positionAndSize={props.positionAndSize}
      objectStyle={props.style}
      onClick={() => props.onClick(props.objectIdentify)}
      onDoubleClick={() => props.onDoubleClick(props.objectIdentify)}
    >
    </Container>
  );
}
