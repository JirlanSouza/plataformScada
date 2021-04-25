import styled from 'styled-components';

const cornerRecoil = '-8px';
const cornerBorderRadius = '2px';

interface ObjectStylePropties {
  position: { x: number, y: number },
  size: { width: number, height: number }
}

export const Container = styled.div<ObjectStylePropties>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: ${props => (props.position.y - 2) + 'px'};
  left: ${props => (props.position.x - 2) + 'px'};
  width: ${props => (props.size.width + 4) + 'px'};
  height: ${props => (props.size.height + 4) + 'px'};
  border: solid 2px ${props => props.theme.pallete.onPrimary};

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
    stroke: ${props => props.theme.pallete.primary.main};
    z-index: 1;
  }
`;

export const Base = styled(baseStyle)``;

const Corners = styled.div`
  position: absolute;
  width:10px;
  height: 10px;
  background: ${props => props.theme.pallete.primary.main};
  z-index: 1;
`;

export const RightUp = styled(Corners)`
  top: ${cornerRecoil};
  right: ${cornerRecoil};
  left: inherit;
  border-radius: 0 0 0 ${cornerBorderRadius}; 
  cursor: nesw-resize;
`;

export const LeftUp = styled(Corners)`
  top: ${cornerRecoil};
  left: ${cornerRecoil};
  border-radius: 0 0 ${cornerBorderRadius} 0;
  cursor: nwse-resize;
`;

export const RightDown = styled(Corners)`
  right: ${cornerRecoil};
  bottom: ${cornerRecoil};
  left: inherit;
  border-radius: ${cornerBorderRadius} 0 0 0;
  cursor: nwse-resize;
`;

export const LeftDown = styled(Corners)`
  bottom: ${cornerRecoil};
  left: ${cornerRecoil};
  border-radius: 0 ${cornerBorderRadius} 0 0;
  cursor: nesw-resize;
`;

export const Edge = styled.div`
  position: absolute;
`;

export const Left = styled(Edge)`
  left: ${cornerRecoil};
  height: inherit;
  width: 10px;
  cursor: col-resize;
`;

export const Right = styled(Edge)`
  left: inherit;
  right: ${cornerRecoil};
  height: inherit;
  width: 10px;
  cursor: col-resize;
`;

export const Up = styled(Edge)`
  top: ${cornerRecoil};
  left: 0;
  width: 100%;
  height: 8px;
  cursor: row-resize;
`;

export const Down = styled(Edge)`
  bottom: ${cornerRecoil};
  left: 0;
  width: 100%;
  height: 8px;
  cursor: row-resize;
`;
