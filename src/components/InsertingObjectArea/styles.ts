import styled from 'styled-components';

import { InsertingObjectAreaState } from '.'

export const Container = styled.div<{ insertingObjectAreaState: InsertingObjectAreaState }>`
  position: absolute;
  top: ${props => props.insertingObjectAreaState.positionY + 'px'};
  left: ${props => props.insertingObjectAreaState.positionX + 'px'};
  width: ${props => props.insertingObjectAreaState.width + 'px'};
  height: ${props => props.insertingObjectAreaState.height + 'px'};
  border: solid 2px ${props => props.theme.pallete.onPrimary}
`;
