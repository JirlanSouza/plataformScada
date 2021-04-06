import React, { useEffect, useRef, useState } from 'react';
import { theme } from '../../styles/theme';
import { useEditorContext, useProjectTreeContext } from '../../contexts';

import { Container, Rectcss, Wrapper } from './styles';
import Rect from '../../projectObjects/Rect/Rectcss';
import ManipulationBorder from '../ManipulationBorder';
import { manipulations } from '../../manipulations/moveAndResizeManipulations';

const Screen: React.FC = () => {
  const [screenWidth, setScreenWdth] = useState(1366);
  const [screenHeight, setScreenHeight] = useState(768);
  const [isManipulating, setIsManipulating] = useState(false);
  const [stateManipulation, setStateManipulation] = useState({
    manipulation: '',
    cursorPositionX: 0,
    cursorPositionY: 0
  });

  const { lineGridWeight, toolSelected } = useEditorContext();
  const { containerWidth } = useProjectTreeContext();

  const screenRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = screenRef?.current;
    const context = canvas?.getContext('2d');
    console.log(context);

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

  function handleStartManipulation(event: React.MouseEvent, manipulation: string) {
    setStateManipulation({
      manipulation,
      cursorPositionX: event.pageX - containerWidth,
      cursorPositionY: event.pageY - parseInt(theme.headerHeight)
    });
    setIsManipulating(true);
  }

  function handleManipulation(event: React.MouseEvent) {
    if (!isManipulating) return;

    const cursorPosition = {
      X: event.pageX - containerWidth,
      Y: event.pageY - parseInt(theme.headerHeight)
    }
    const index = stateManipulation.manipulation

    const updateObjectState = manipulations[index]({stateObject, cursorPosition});
    console.log('State object ===>>> ', updateObjectState, 'cursor position   ===>>>', cursorPosition);
    setStateObject(updateObjectState);

    // if (toolSelected === 'Square' && screenRef.current) {
    //   const screen = screenRef.current;
    //   const context = screen.getContext('2d');

    //   if (!context) return;
    //   Rect(
    //     context,
    //     { x: stateManipulation.cursorPositionX, y: stateManipulation.cursorPositionY },
    //     { x: width, y: height },
    //     '#AA88FF'
    //   );
    // }
  }

  function handleFinishManipulation() {
    setIsManipulating(false);
  }

  const [startManipulation, setStartManipulation] = useState(false);
  const [stateObject, setStateObject] = useState({
    positionX: 300,
    positionY: 200,
    width: 200,
    height: 200
  });

  return (
    <Wrapper
      onClick={() => startManipulation && !isManipulating && setStartManipulation(false)}
      onMouseMove={handleManipulation}
      onMouseUp={handleFinishManipulation}  
    >
      <ManipulationBorder
        show={startManipulation}
        objectStylePropties={stateObject}
        startMoveManipulation={event => handleStartManipulation(event, 'move')}
        startResizeUpManipulation={event => handleStartManipulation(event, 'resizeUp')}
        startResizeDownManipulation={event => handleStartManipulation(event, 'resizeDown')}
        startResizeLeftManipulation={event => handleStartManipulation(event, 'resizeLeft')}
        startResizeRightManipulation={event => handleStartManipulation(event, 'resizeRight')}
        setShowManipulation={() => setStartManipulation(true)}
      >
        {Rect}
        
      </ManipulationBorder>
      {/* <Container
      ref={screenRef}
      width={screenWidth}
      height={screenHeight}
      isManipulating={isManipulating}
      onMouseDown={handleStartManipulation}
      onMouseMove={handleManipulation}
      onMouseUp={handleFinishManipulation}
    >
      

    </Container> */}
    </Wrapper>
  );
}

export default Screen;