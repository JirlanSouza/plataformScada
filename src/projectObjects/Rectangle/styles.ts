import styled from 'styled-components';

import { ObjectPositionAndSizePropties, ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.div<{ positionAndSize: ObjectPositionAndSizePropties, objectStyle: ObjectStylePropties}>`
  position: absolute;
  top: ${props => props.positionAndSize.positionY + 'px'};
  left: ${props => props.positionAndSize.positionX + 'px'};
  width: ${props => props.positionAndSize.width + 'px'};
  height: ${props => props.positionAndSize.height + 'px'};
  background: ${props => props.objectStyle.background.color};
  border: ${props => props.objectStyle.border.width}
  ${props => props.objectStyle.border.style}
  ${props => props.objectStyle.border.color}
`;