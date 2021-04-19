import styled from 'styled-components';

import { PositionPropties, SizePropties, ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.div<{ position: PositionPropties, size: SizePropties, objectStyle: ObjectStylePropties}>`
  position: absolute;
  top: ${props => props.position.x + 'px'};
  left: ${props => props.position.y + 'px'};
  width: ${props => props.size.width + 'px'};
  height: ${props => props.size.height + 'px'};
  border-radius: 50%;
  background: ${props => props.objectStyle.background.color};
`;