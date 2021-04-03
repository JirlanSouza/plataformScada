import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - ${props => props.theme.headerHeight});
  
`;
