import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: ${props => props.theme.headerHeight};
  background: ${props => props.theme.headerBackgound};
  padding: .5rem;
  color: ${props => props.theme.pallete.onPrimary}
`;
