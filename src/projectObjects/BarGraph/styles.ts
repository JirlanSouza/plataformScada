import styled from 'styled-components';

import { ObjectPositionAndSizePropties, ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.div<{ positionAndSize: ObjectPositionAndSizePropties, objectStyle: ObjectStylePropties}>`
  position: absolute;
  top: ${props => props.positionAndSize.positionY + 'px'};
  left: ${props => props.positionAndSize.positionX + 'px'};
  width: ${props => props.positionAndSize.width + 'px'};
  height: ${props => props.positionAndSize.height + 'px'};
  border-radius: ${props => ((props.positionAndSize.width /100) * 10) + 'px'};
  border: none;
  box-shadow: 0 0 6px ${props => props.theme.pallete.onPrimary};
  background: ${props => props.objectStyle.background.color};
  overflow: hidden;

  text-anchor: end;

  .bar {
    fill: #d81c3f;
  }

  .axis {
    font-size: 12px;
    color: ${props => props.objectStyle.font.color};
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #FCFCFC;
    shape-rendering: crispEdges;
  }
`;
