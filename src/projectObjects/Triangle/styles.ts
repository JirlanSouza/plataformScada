import styled from 'styled-components'

import { ObjectPositionAndSizePropties, ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.svg<{ positionAndSize: ObjectPositionAndSizePropties, objectStyle: ObjectStylePropties}>`
position: absolute;

top: ${props => props.positionAndSize.positionY + 'px'};
left: ${props => props.positionAndSize.positionX + 'px'};
width: ${props => props.positionAndSize.width + 'px'};
height: ${props => props.positionAndSize.height + 'px'};
  fill: '#C4C4C4'
`;
