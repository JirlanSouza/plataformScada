import styled from 'styled-components';

interface ObjectStylePropties {
  positionX: number,
  positionY: number,
  width: number,
  height: number
}

export const Container = styled.div<ObjectStylePropties>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: ${props => props.positionY + 'px'};
  left: ${props => props.positionX + 'px'};
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  border: solid 2px #09B6CD;
  z-index: 1;

`;

const baseStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;

  transition: cursor .2s ease;
`;

export const Top = styled(baseStyle)``;

export const Center = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    cursor: move;
    stroke: #E5FF46;
  }
`;

export const Base = styled(baseStyle)``;

const Corners = styled.div`
  position: absolute;
  width:10px;
  height: 10px;
  background: #E5FF46;
`;

export const RightUp = styled(Corners)`
  top: -8px;
  right: -8px;
  left: inherit;
  cursor: nesw-resize;
`;

export const LeftUp = styled(Corners)`
  top: -8px;
  left: -8px;
  cursor: nwse-resize;
`;

export const RightDown = styled(Corners)`
  right: -8px;
  left: inherit;
  cursor: nwse-resize;
`;

export const LeftDown = styled(Corners)`
  bottom: -8px;
  left: -8px;
  cursor: nesw-resize;
`;

export const Edge = styled.div`
  position: absolute;
`;

export const Left = styled(Edge)`
  left: -8px;
  height: inherit;
  width: 10px;
  cursor: col-resize;
`;

export const Right = styled(Edge)`
  left: inherit;
  right: -8px;
  height: inherit;
  width: 10px;
  cursor: col-resize;
`;

export const Up = styled(Edge)`
  top: -8px;
  left: 0;
  width: 100%;
  height: 8px;
  cursor: row-resize;
`;

export const Down = styled(Edge)`
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 8px;
  cursor: row-resize;
`;
