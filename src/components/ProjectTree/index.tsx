import React, { useState } from 'react';

import { FiChevronRight, FiChevronDown, FiFolder, FiMonitor, FiImage } from 'react-icons/fi';
import { useProjectTreeContext } from '../../contexts/projectTreeContext';
import { resizeContainer } from '../../utils/resizezeContainers';

import { Container, Resizer, ProjectFolders } from './styles';

const ProjectTree: React.FC = () => {
  const [folders, setFolders] = useState([
    { name: 'conections', filds: [], opening: false, iconFilds: FiImage },
    {
      name: 'displays', filds: [
        { name: 'torre' },
        { name: 'tanque' },
        { name: 'PID_Motor' },
        { name: 'PID_Valvula_Controle' },
      ], opening: false, iconFilds: FiMonitor
    },
    { name: 'images', filds: [
      { name: 'torre' },
      { name: 'tanque' },
      { name: 'motor' },
      { name: 'valvula' },
      { name: 'switch' },
    ], opening: false, iconFilds: FiImage
    },
    { name: 'scripts', filds: [], opening: false, iconFilds: FiImage },
    { name: 'objects', filds: [], opening: false, iconFilds: FiImage },
    { name: 'tags', filds: [], opening: false, iconFilds: FiImage },
    { name: 'alarmes an events', filds: [], opening: false, iconFilds: FiImage },
    { name: 'users', filds: [], opening: false, iconFilds: FiImage },
  ]);

  const {
    containerWidth,
    setContainerWidth,
    isClickedBorderContainer,
    setIsClickedBorderContainer
  } = useProjectTreeContext();

  function handleResize(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsClickedBorderContainer(true);
  }

  function handleResizeMove(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!isClickedBorderContainer || containerWidth < 50) return;
    const width = resizeContainer(containerWidth, event.clientX)
    setContainerWidth(width);
  }

  function handleResizeFinal(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsClickedBorderContainer(false);
  }

  function handleOpenFolder(index: number) {
    const foldersToUpdate = folders.slice();
    foldersToUpdate[index].opening = !foldersToUpdate[index].opening;
    setFolders(foldersToUpdate);
  }

  return (
    <Container
      resizing={isClickedBorderContainer}
      resize={containerWidth}
      onMouseUp={handleResizeFinal}
      onMouseMove={event => handleResizeMove(event)}
    >
      <ProjectFolders>
        {folders.map((folder, index) => {
          return (
            <li key={index}>
              <div onClick={() => handleOpenFolder(index)}>
                {folder.opening ?
                  <FiChevronDown size={18} /> :
                  <FiChevronRight size={18} />
                }
                <FiFolder size={18} />
                {folder.name}
              </div>
              {folder.opening &&
                <div>
                  {folder.filds.map((fild, index) => {
                    return (
                      <li key={index}>
                        <folder.iconFilds size={18} />
                        {fild.name}
                      </li>
                    )
                  })}
                </div>
              }
            </li>
          )
        })}
      </ProjectFolders>
      <Resizer onMouseDown={event => handleResize(event)} />
    </Container>
  );
}

export default ProjectTree;