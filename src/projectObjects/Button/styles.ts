import styled from 'styled-components';

import { ObjectPositionAndSizePropties, ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.button<{ positionAndSize: ObjectPositionAndSizePropties, objectStyle: ObjectStylePropties}>`
  position: absolute;
  top: ${props => props.positionAndSize.positionY + 'px'};
  left: ${props => props.positionAndSize.positionX + 'px'};
  width: ${props => props.positionAndSize.width + 'px'};
  height: ${props => props.positionAndSize.height + 'px'};
  box-shadow: 0 0 6px ${props => props.theme.pallete.onPrimary};
  background: ${props => props.objectStyle.background.color};
  border: ${props => props.objectStyle.border.width}
  ${props => props.objectStyle.border.style}
  ${props => props.objectStyle.border.color}
`;
