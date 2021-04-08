import React from 'react';

import { Container } from './styles';
import { ObjectStylePropties } from '../ObjectPorpties';

export const Circle: React.FC<{ objectStylePropties: ObjectStylePropties, onClick: (event: React.MouseEvent) => void}> = (props) => {
  return (
    <Container objectStylePropties={props.objectStylePropties} onClick={props.onClick}>

    </Container>
  );
}
