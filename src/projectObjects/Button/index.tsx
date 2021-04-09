import React from 'react';

import { ObjectComponent } from '../ObjectPorpties'

import { Container } from './styles';

export const Button: ObjectComponent = (props) => {
  return (
    <Container
    objectStylePropties={props.objectStylePropties}
    onClick={() => props.onClick(props.objectIdentify)}
    >

    </Container>
  );
}