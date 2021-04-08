import styled from 'styled-components';

interface ObjectStylePropties {
  positionX: number,
  positionY: number,
  width: number,
  height: number
}

export const Container = styled.div<{objectStylePropties: ObjectStylePropties}>`
  position: absolute;
  top: ${props => props.objectStylePropties.positionY + 'px'};
  left: ${props => props.objectStylePropties.positionX + 'px'};
  width: ${props => props.objectStylePropties.width + 'px'};
  height: ${props => props.objectStylePropties.height + 'px'};
  border-radius: 50%;
  background: #C4C4C4;
`;