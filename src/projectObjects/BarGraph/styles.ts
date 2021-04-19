import styled from 'styled-components';

import { PositionPropties, SizePropties, ObjectStylePropties } from '../ObjectPorpties';

export const Container = styled.div<{ position: PositionPropties, size: SizePropties, objectStyle: ObjectStylePropties}>`
  position: absolute;
  top: ${props => props.position.x + 'px'};
  left: ${props => props.position.y + 'px'};
  width: ${props => props.size.width + 'px'};
  height: ${props => props.size.height + 'px'};
  border-radius: ${props => ((props.size.width /100) * 10) + 'px'};
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
    color: ${props => props.objectStyle.font?.color};
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #FCFCFC;
    shape-rendering: crispEdges;
  }
`;
