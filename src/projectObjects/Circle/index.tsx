import React from 'react';

import { Container } from './styles';
import { ObjectComponent } from '../ObjectPorpties';

export const Circle: ObjectComponent = (props) => {
  return (
    <Container
      objectStylePropties={props.objectStylePropties}
      onClick={() => props.onClick(props.objectIdentify)}
    >
    </Container>
  );
}
