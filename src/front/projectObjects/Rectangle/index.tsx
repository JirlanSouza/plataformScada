import React from 'react';

import { Container } from './styles';
import { ObjectComponent } from '../ObjectPorpties';

export const Rectangle: ObjectComponent = (props) => {
  return (
    <Container
      position={props.position}
      size={props.size}
      objectStyle={props.style}
      onClick={() => props.onClick(props.objectIdentify)}
      onDoubleClick={() => props.onDoubleClick(props.objectIdentify)}
    />
  );
};
