import React, { useState } from 'react';
import { useProjectTreeContext } from '../../contexts/projectTreeContext';
import { resizeContainer } from '../../utils/resizezeContainers';

import { Container, Resizer } from './styles';

const ProjectTree: React.FC = () => {
  const { 
  containerWidth,
  setContainerWidth,
  positionBorderContainer,
  setPositionBorderContainer,
  isClickedBorderContainer,
  setIsClickedBorderContainer
  } = useProjectTreeContext();

  function handleResize (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log('MOVE start X ==>>', event.clientX);
    setIsClickedBorderContainer(true);
    setPositionBorderContainer(event.clientX);
  }

  function handleResizeMove (event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!isClickedBorderContainer) return;
    const width = resizeContainer(positionBorderContainer, event.clientX)
    setContainerWidth(width);
    setPositionBorderContainer(width);
  }

  function handleResizeFinal (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsClickedBorderContainer(false);
  }

  return (
    <Container resize={containerWidth} onMouseUp={handleResizeFinal} onMouseMove={event => handleResizeMove(event)}>
      <div />
      <Resizer
        onMouseDown={event => handleResize(event)}
        
        
      />
    </Container>
  );
}

export default ProjectTree;