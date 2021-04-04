import styled from 'styled-components';

export const Container = styled.canvas<{width: number, height: number}>`
  width: ${props => props.width};
  height: ${props => props.height};
  border: 2px solid ${props => props.theme.headerBackgound};
`;
