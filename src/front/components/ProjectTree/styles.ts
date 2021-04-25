import styled, { css } from 'styled-components';

export const Container = styled.aside<{
  resizing: boolean;
  resize?: number;
}>`
  display: flex;
  width: ${(props) => (props.resize ? `${props.resize}px` : '18rem')};
  height: 100%;
  background: ${(props) => props.theme.pallete.surface};
  ${(props) =>
    props.resizing &&
    css`
      cursor: col-resize;
    `};
`;

export const Resizer = styled.div<{ isClosing: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 3px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.pallete.onPrimary} 5%,
    ${(props) => props.theme.headerBackgound} 10%,
    ${(props) => props.theme.pallete.onPrimary} 5%
  );
  cursor: col-resize;
  transition: all 0.2s ease-out;

  div {
    display: none;
  }

  :hover {
    background: linear-gradient(
      to right,
      ${(props) => props.theme.pallete.onPrimary},
      ${(props) => props.theme.headerBackgound},
      ${(props) => props.theme.pallete.primary.main} 15%
    );

    div {
      position: absolute;
      right: ${(props) => (props.isClosing ? '' : '0px')};
      left: ${(props) => (props.isClosing ? '0px' : '')};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${(props) =>
        props.isClosing ? '0 8px 8px 0' : '8px 0 0 8px'};
      border: 2px solid ${(props) => props.theme.pallete.primary.main};
      width: 20px;
      height: 40px;

      cursor: pointer;
      z-index: 1;

      svg {
        stroke: ${(props) => props.theme.pallete.primary.main};
        stroke-width: 3px;
      }
    }
  }
`;

export const ProjectFolders = styled.ul`
  flex: 1;
  width: calc(100% - 8px);
  margin-top: 0.5rem;
  transition: all 0.2s ease-out;
  overflow-x: visible;
`;

export const Folder = styled.li`
  word-wrap: break-word;
  list-style: none;
  padding: 0.1rem;
  cursor: pointer;
  color: ${(props) => props.theme.pallete.onSurface};

  svg {
    margin-right: 0.4rem;
    flex-shrink: 0;
  }
`;

export const FolderIconsWrapper = styled.div`
  height: 1.4rem;
  display: flex;
  align-items: baseline;
  overflow: hidden;

  svg.folder {
    fill: ${(props) => props.theme.pallete.primary.main};
    stroke: ${(props) => props.theme.pallete.primary.main};
  }
`;

export const FilesContainer = styled.div`
  flex-direction: column;
  height: auto;
  margin-left: 2rem;
`;

export const File = styled.li`
  display: flex;
  height: 1.4rem;
  align-items: baseline;
  overflow: hidden;

  svg {
    stroke: ${(props) => props.theme.pallete.primary.main};
  }

  svg.file {
    stroke: ${(props) => props.theme.pallete.primary.main};
    fill: ${(props) => props.theme.pallete.onSurface};
  }
`;
