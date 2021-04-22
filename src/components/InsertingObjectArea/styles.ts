import styled from 'styled-components';

import { InsertingObjectAreaState } from '.'

export const Container = styled.div<{ insertingObjectAreaState: InsertingObjectAreaState }>`
  position: absolute;
  top: ${props => props.insertingObjectAreaState.position.y + 'px'};
  left: ${props => props.insertingObjectAreaState.position.x + 'px'};
  width: ${props => props.insertingObjectAreaState.size.width + 'px'};
  height: ${props => props.insertingObjectAreaState.size.height + 'px'};
  border: solid 2px ${props => props.theme.pallete.onPrimary}
`;
