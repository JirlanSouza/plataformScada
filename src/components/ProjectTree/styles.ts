import styled, { css } from 'styled-components';

export const Container = styled.aside<{resizing: boolean, resize?: number}>`
display: flex;
width: ${props => props.resize ? `${props.resize}px` : '18rem' };
height: 100%;
background: ${props => props.theme.pallete.surface};
${props => props.resizing && css`
  cursor: col-resize;
`};
  
`;

export const Resizer = styled.div`
  height: 100%;
  width: 8px;
  background: linear-gradient(
    to right,
    ${props => props.theme.pallete.onPrimary},
    ${props => props.theme.pallete.onBackground},
    ${props => props.theme.pallete.onPrimary}
  );
  cursor: col-resize;
  transition: all .2s ease-out;

  :hover {
    background: linear-gradient(
    to right,
    ${props => props.theme.pallete.onPrimary},
    ${props => props.theme.headerBackgound},
    ${props => props.theme.pallete.onPrimary}
  );
  }
`;

export const ProjectFolders = styled.ul`
  flex: 1;
  width: calc(100% - 8px);
  margin-top: .5rem;
  transition: all .2s ease-out;
  overflow-x: visible;

  li {
    word-wrap: break-word;
    list-style: none;
    padding: .1rem;
    cursor: pointer;

    svg {
      margin-right: .4rem;
      flex-shrink: 0;
    }

    div {
      height: 1.4rem;
      display: flex;
        flex-wrap: nowrap;
        align-items: baseline;
        overflow: hidden;
    }

    div + div {
      flex-direction: column;
      height: auto;
      margin-left: 2rem;

      li {
        display: flex;
        flex-wrap: nowrap;
        align-items: baseline;
        overflow: inherit;
      }
    }
  }
`;
