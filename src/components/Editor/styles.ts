import styled, { css } from 'styled-components';

export const Container = styled.div<{resizing: boolean}>`
position: relative;
  flex: 1;
  width: 100px;
  height: 100%;
  background: ${props => props.theme.pallete.background};
  overflow: scroll;

  ${props => props.resizing && css`
  cursor: col-resize;
`};
`;
