import React from 'react';

import { useProjectTreeContext } from '../../contexts/projectTreeContext';
import { resizeContainer } from '../../utils/resizezeContainers';

import { Container } from './styles';

const Editor: React.FC = () => {
  const { 
    containerWidth,
    setContainerWidth,
    positionBorderContainer,
    setPositionBorderContainer,
    isClickedBorderContainer,
    setIsClickedBorderContainer
    } = useProjectTreeContext();

  function handleResizeMove (event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!isClickedBorderContainer) return;
    const width = resizeContainer(containerWidth, event.clientX)
    setContainerWidth(width);
    setPositionBorderContainer(width);
  }

  function handleResizeFinal (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsClickedBorderContainer(false);
  }

  return (
    <Container onMouseUp={handleResizeFinal} onMouseMove={event => handleResizeMove(event)}>
      
    </Container>
  );
}

export default Editor;