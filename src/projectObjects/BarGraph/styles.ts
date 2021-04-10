import styled from 'styled-components';

import { ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.div<{ objectStylePropties: ObjectStylePropties }>`
  position: absolute;
  top: ${props => props.objectStylePropties.positionY + 'px'};
  left: ${props => props.objectStylePropties.positionX + 'px'};
  width: ${props => props.objectStylePropties.width + 'px'};
  height: ${props => props.objectStylePropties.height + 'px'};
  border-radius: ${props => ((props.objectStylePropties.width /100) * 10) + 'px'};
  border: none;
  box-shadow: 0 0 6px ${props => props.theme.pallete.onPrimary};
  background: #64C4F4;
  overflow: hidden;

  text-anchor: end;

  .bar {
    fill: #d81c3f;
  }

  .axis {
    font-size: 12px;
    color: #FCFCFC;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #FCFCFC;
    shape-rendering: crispEdges;
  }
`;
