import styled from 'styled-components';

import { PositionPropties, SizePropties, ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.button<{ position: PositionPropties, size: SizePropties, objectStyle: ObjectStylePropties}>`
  position: absolute;
  top: ${props => props.position.x + 'px'};
  left: ${props => props.position.y + 'px'};
  width: ${props => props.size.width + 'px'};
  height: ${props => props.size.height + 'px'};
  box-shadow: 0 0 6px ${props => props.theme.pallete.onPrimary};
  background: ${props => props.objectStyle.background.color};
  border: ${props => props.objectStyle.border.width}
  ${props => props.objectStyle.border.style}
  ${props => props.objectStyle.border.color}
`;
