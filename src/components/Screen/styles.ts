import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{screen: { width: number, height: number }}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.screen.width + 'px'};
  height: ${props => props.screen.height + 'px'};
  border: 2px solid ${props => props.theme.headerBackgound};
`;