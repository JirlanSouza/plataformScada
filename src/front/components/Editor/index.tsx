import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useProjectTreeContext } from '../../contexts/projectTreeContext';
import { useAppSelector } from '../../store';
import { changeEditorArea } from '../../store/Editor';
import { resizeContainer } from '../../utils/size';
import Screen from '../Screen';

import { Container } from './styles';

const Editor: React.FC = () => {
  const dispatch = useDispatch();

  const screens = useAppSelector((state) => state.screens);

  const {
    containerWidth,
    setContainerWidth,
    isClickedBorderContainer,
    setIsClickedBorderContainer,
  } = useProjectTreeContext();

  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      const editorArea = {
        width: editorContainerRef.current.clientWidth,
        height: editorContainerRef.current.clientHeight,
      };

      dispatch(changeEditorArea(editorArea));
    }
  }, [containerWidth]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleResizeMove(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!isClickedBorderContainer) return;
    const width = resizeContainer(containerWidth, event.clientX);
    setContainerWidth(width);
  }

  function handleResizeFinal() {
    setIsClickedBorderContainer(false);
  }

  return (
    <Container
      ref={editorContainerRef}
      resizing={isClickedBorderContainer}
      onMouseUp={handleResizeFinal}
      onMouseMove={(event) => handleResizeMove(event)}
    >
      {screens.screenOpening > -1 && (
        <Screen screenId={screens.screenOpening} />
      )}
    </Container>
  );
};

export default Editor;
