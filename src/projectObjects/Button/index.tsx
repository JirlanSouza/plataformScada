import React from 'react';

import { ObjectComponent } from '../ObjectPorpties'

import { Container } from './styles';

export const Button: ObjectComponent = (props) => {
  return (
    <Container
    positionAndSize={props.positionAndSize}
    objectStyle={props.style}
    onClick={() => props.onClick(props.objectIdentify)}
    >

    </Container>
  );
}