import styled from 'styled-components';

import { ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.button<{objectStylePropties: ObjectStylePropties}>`
  position: absolute;
  top: ${props => props.objectStylePropties.positionY + 'px'};
  left: ${props => props.objectStylePropties.positionX + 'px'};
  width: ${props => props.objectStylePropties.width + 'px'};
  height: ${props => props.objectStylePropties.height + 'px'};
  border-radius: 10%;
  border: none;
  box-shadow: 0 0 6px ${props => props.theme.pallete.onPrimary};
  background: #64C4F4;
`;
