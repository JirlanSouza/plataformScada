import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Container = styled.canvas<{ width: number, height: number, isManipulating: boolean }>`
  width: ${props => props.width};
  height: ${props => props.height};
  border: 2px solid ${props => props.theme.headerBackgound};
  
  ${props => props.isManipulating && css`
  cursor: cell;
  `};
`;

interface RectPropties {x: number, y: number, width: number, height: number}

export const Rectcss = styled.div<RectPropties>`
  position: absolute;
  top: ${props => props.y + 'px'};
  left: ${props => props.x + 'px'};
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  background: #C4C4C4;
`;