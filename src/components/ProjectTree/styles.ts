import styled from 'styled-components';

export const Container = styled.aside<{resize?: number}>`
display: flex;
flex-direction: column;
align-items: flex-end;
width: ${props => props.resize ? `${props.resize}px` : '18rem' };
height: 100%;
background: ${props => props.theme.pallete.background};
  
`;

export const Resizer = styled.div`
  height: 100%;
  width: 4px;
  background: ${props => props.theme.pallete.onBackground};
  cursor: col-resize;
  transition: all .2s ease-out;

  :hover {
    background: ${props => props.theme.headerBackgound};
  }
`;
