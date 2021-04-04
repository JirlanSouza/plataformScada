import styled, { css } from 'styled-components';

export const Container = styled.div<{resizing: boolean}>`
  flex: 1;
  width: 100px;
  height: 100%;
  background: ${props => props.theme.pallete.background};

  ${props => props.resizing && css`
  cursor: col-resize;
`};
`;
