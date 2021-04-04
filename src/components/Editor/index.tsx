import React from 'react';

import { useProjectTreeContext } from '../../contexts/projectTreeContext';
import { resizeContainer } from '../../utils/resizezeContainers';
import Screen from '../Screen';

import { Container } from './styles';

const Editor: React.FC = () => {
  const { 
    containerWidth,
    setContainerWidth,
    isClickedBorderContainer,
    setIsClickedBorderContainer
    } = useProjectTreeContext();

  function handleResizeMove (event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!isClickedBorderContainer) return;
    const width = resizeContainer(containerWidth, event.clientX)
    setContainerWidth(width);
  }

  function handleResizeFinal (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsClickedBorderContainer(false);
  }

  return (
    <Container
      resizing={isClickedBorderContainer}
      onMouseUp={handleResizeFinal}
      onMouseMove={event => handleResizeMove(event)
    }>
      <Screen />   
    </Container>
  );
}

export default Editor;