import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{
  screen: { width: number; height: number };
  showCursorObject: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.screen.width}px`};
  height: ${(props) => `${props.screen.height}px`};
  border: 2px solid ${(props) => props.theme.headerBackgound};
  outline: none;
  background: red;

  ${(props) =>
    props.showCursorObject &&
    css`
      cursor: crosshair;
    `}
`;

export const CursorObject = styled.div<{
  cursorObjectState: { positionX: number; positionY: number };
}>`
  position: absolute;
  top: ${(props) => `${props.cursorObjectState.positionY}px`};
  left: ${(props) => `${props.cursorObjectState.positionX}px`};

  svg {
    stroke: ${(props) => props.theme.pallete.onPrimary};
  }
`;
