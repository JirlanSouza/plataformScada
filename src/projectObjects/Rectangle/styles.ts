import styled from 'styled-components';

import { ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.div<{objectStylePropties: ObjectStylePropties}>`
  position: absolute;
  top: ${props => props.objectStylePropties.positionY + 'px'};
  left: ${props => props.objectStylePropties.positionX + 'px'};
  width: ${props => props.objectStylePropties.width + 'px'};
  height: ${props => props.objectStylePropties.height + 'px'};
  background: #C4C4C4;
`;