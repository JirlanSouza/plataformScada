import React, { useEffect, useRef, useState } from 'react';
import { theme } from '../../styles/theme';
import { useEditorContext } from '../../contexts/editorContext';

import { Container } from './styles';

const Screen: React.FC = () => {
  const [screenWidth, setScreenWdth] = useState(1366);
  const [screenHeight, setScreenHeight] = useState(768);
  const {lineGridWeight } = useEditorContext();

  const screenRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = screenRef?.current;
    const context = canvas?.getContext('2d');
    
    if (canvas && context) {
      context.clearRect(0, 0, screenWidth, screenHeight);
      context.strokeStyle = theme.pallete.onBackground

      for (let i = lineGridWeight; i <= screenWidth; i += lineGridWeight) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, screenHeight);
        context.stroke();
        context.closePath();
      };

      for (let i = lineGridWeight; i <= screenHeight; i += lineGridWeight) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(screenWidth, i);
        context.stroke();
        context.closePath();
      };
    }
  }, [screenWidth, screenHeight, lineGridWeight]);

  return (
    <Container ref={screenRef} width={screenWidth} height={screenHeight} >

    </Container>
  );
}

export default Screen;