import React, { useState } from 'react';

import {
  FiChevronRight,
  FiChevronDown,
  FiFolder,
  FiMonitor,
  FiImage,
  FiChevronLeft,
  FiPlusSquare,
} from 'react-icons/fi';
import { useAppContext } from '../../contexts';
import { useProjectTreeContext } from '../../contexts/projectTreeContext';
import { useAppDispatch, useAppSelector } from '../../store';
import { screenActions } from '../../store/screens';
import { resizeContainer } from '../../utils/size';
import StartScreenPropties from '../Modal/StartScreenPropties';

import {
  Container,
  Resizer,
  ProjectFolders,
  Folder,
  File,
  FilesContainer,
  FolderIconsWrapper,
} from './styles';

const ProjectTree: React.FC = () => {
  const dispatch = useAppDispatch();
  const screens = useAppSelector((state) => state.screens);

  const [showAddFileDialog, setShowAddFileDialog] = useState(false);

  const [folders, setFolders] = useState([
    { name: 'Conections', filds: [], opening: false, iconFilds: FiImage },
    {
      name: 'Screens',
      filds: [
        { name: 'torre' },
        { name: 'tanque' },
        { name: 'PID_Motor' },
        { name: 'PID_Valvula_Controle' },
      ],
      opening: false,
      iconFilds: FiMonitor,
    },
    {
      name: 'Images',
      filds: [
        { name: 'torre' },
        { name: 'tanque' },
        { name: 'motor' },
        { name: 'valvula' },
        { name: 'switch' },
      ],
      opening: false,
      iconFilds: FiImage,
    },
    { name: 'Scripts', filds: [], opening: false, iconFilds: FiImage },
    { name: 'Objects', filds: [], opening: false, iconFilds: FiImage },
    { name: 'Tags', filds: [], opening: false, iconFilds: FiImage },
    {
      name: 'Alarmes an events',
      filds: [],
      opening: false,
      iconFilds: FiImage,
    },
    { name: 'Users', filds: [], opening: false, iconFilds: FiImage },
  ]);

  const { appClickEvent } = useAppContext();

  const {
    containerWidth,
    setContainerWidth,
    isClickedBorderContainer,
    setIsClickedBorderContainer,
  } = useProjectTreeContext();

  const [lastContainerWidth, setLastContainerWidth] = useState(containerWidth);
  const [projectTreeIsClosed, setProjectTreeIsClosed] = useState(false);

  function handleResize() {
    setIsClickedBorderContainer(true);
  }

  function handleResizeMove(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!isClickedBorderContainer || containerWidth < 50) return;
    const width = resizeContainer(containerWidth, event.clientX);
    setContainerWidth(width);
    setLastContainerWidth(width);
  }

  function handleResizeFinal() {
    setIsClickedBorderContainer(false);
  }

  function handleClosedProjectTree() {
    if (projectTreeIsClosed) {
      setContainerWidth(lastContainerWidth);
      setProjectTreeIsClosed(false);
      return;
    }
    setLastContainerWidth(containerWidth);
    setContainerWidth(2);
    setProjectTreeIsClosed(true);
  }

  function handleOpenFolder(index: number) {
    const foldersToUpdate = folders.slice();
    foldersToUpdate[index].opening = !foldersToUpdate[index].opening;
    setFolders(foldersToUpdate);
  }

  function handleFileClick(folderId: number, fileId: number) {
    dispatch(screenActions.onpeningScreen(fileId));
  }

  function handleAddNewFile() {
    setShowAddFileDialog(true);
  }

  function handleFinishAddNewFile(screenPropties: {
    name: string;
    size: { width: number; height: number };
  }) {
    dispatch(screenActions.addScreen(screenPropties));
  }

  return (
    <>
      <Container
        resizing={isClickedBorderContainer}
        resize={containerWidth}
        onClick={appClickEvent}
        onMouseUp={handleResizeFinal}
        onMouseMove={(event) => handleResizeMove(event)}
      >
        <ProjectFolders>
          {folders.map((folder, index) => {
            return (
              <Folder key={folder.name}>
                <FolderIconsWrapper onClick={() => handleOpenFolder(index)}>
                  {folder.opening ? (
                    <FiChevronDown size={18} />
                  ) : (
                    <FiChevronRight size={18} />
                  )}
                  <FiFolder className="folder" size={18} />
                  {folder.name}
                </FolderIconsWrapper>

                {folder.opening && (
                  <FilesContainer>
                    <File className="FileItem" onClick={handleAddNewFile}>
                      <FiPlusSquare size={18} />
                      Add new {folder.name.substr(0, folder.name.length - 1)}
                    </File>

                    {screens.items.map((fild) => {
                      return (
                        <File
                          key={fild.name}
                          className="FileItem"
                          onClick={() => handleFileClick(0, fild.id)}
                        >
                          <folder.iconFilds className="file" size={17} />
                          {fild.name}
                        </File>
                      );
                    })}
                  </FilesContainer>
                )}
              </Folder>
            );
          })}
        </ProjectFolders>
        <Resizer isClosing={projectTreeIsClosed} onMouseDown={handleResize}>
          <div
            onClick={handleClosedProjectTree}
            onKeyPress={handleClosedProjectTree}
            role="button"
            tabIndex={0}
          >
            {projectTreeIsClosed ? (
              <FiChevronRight size={20} />
            ) : (
              <FiChevronLeft size={20} />
            )}
          </div>
        </Resizer>
        {showAddFileDialog && (
          <StartScreenPropties
            setShowDialog={setShowAddFileDialog}
            addNewFile={handleFinishAddNewFile}
          />
        )}
      </Container>
    </>
  );
};

export default ProjectTree;
