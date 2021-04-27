import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - ${(props) => props.theme.headerHeight});
  box-shadow: 0 -3px 3px ${(props) => props.theme.pallete.background};
`;
