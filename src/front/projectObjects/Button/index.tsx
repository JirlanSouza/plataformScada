import React from 'react';

import { ObjectComponent } from '../ObjectPorpties';

import { Container } from './styles';

export const Button: ObjectComponent = (props) => {
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
