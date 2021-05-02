import React, { useEffect, useRef, useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { FiGrid } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../store';

import { Button, ButtonsWarapper } from '../ui/Button';

import {
  Body,
  Container,
  Content,
  InputWrapper,
  Menu,
  Secssion,
  SecssionTitle,
  Title,
  TopBar,
} from './styles';

import { moveDialog } from '../../store/diologObjectProptiesEdit';
import { AppTheme } from '../../styles/theme';

const StartScreenPropties: React.FC<{
  setShowDialog: (value: boolean) => void;
  addNewFile: (screenPropties: {
    name: string;
    size: { width: number; height: number };
  }) => void;
  // screenMouseMove: { x: number; y: number };
  // screenMouseUp: boolean;
}> = (props) => {
  const [menuItemSelected, setMenuItemSelected] = useState('style');
  const [movingDialog, setMovingDialog] = useState(false);
  const [positionDiffDialog, setPositionDiffDialog] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [screenName, setScreenName] = useState('unnamed');

  const theme = useContext<AppTheme>(ThemeContext);

  const dialogObjectProptiesEdit = useAppSelector(
    (state) => state.dilogObjectProptiesEdit
  );
  const dispatch = useAppDispatch();

  const inputNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputNameRef.current?.select();
  }, []);

  // useEffect(() => {
  //   handleMouseUp();
  // }, [props.screenMouseUp]);

  // useEffect(() => {
  //   handleMoveDialog(props.screenMouseMove);
  // }, [props.screenMouseMove]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDone() {
    props.setShowDialog(false);
    props.addNewFile({ name: screenName, size: screenSize });
  }

  function handleMouseDown(event: React.MouseEvent) {
    setPositionDiffDialog({
      x: event.clientX - dialogObjectProptiesEdit.position.x,
      y: event.clientY - dialogObjectProptiesEdit.position.y,
    });
    setMovingDialog(true);
  }

  function handleMoveDialog(cursorPosition: { x: number; y: number }) {
    if (!movingDialog) return;
    dispatch(
      moveDialog({
        x:
          dialogObjectProptiesEdit.position.x -
          positionDiffDialog.x +
          (cursorPosition.x - dialogObjectProptiesEdit.position.x),
        y:
          dialogObjectProptiesEdit.position.y -
          positionDiffDialog.y +
          (cursorPosition.y - dialogObjectProptiesEdit.position.y),
      })
    );
  }

  function handleMouseUp() {
    setMovingDialog(false);
  }

  function handleWidth(event: React.ChangeEvent<HTMLInputElement>) {
    setScreenSize({
      ...screenSize,
      width: parseInt(event.target.value, 10),
    });
  }

  function handleHeight(event: React.ChangeEvent<HTMLInputElement>) {
    setScreenSize({
      ...screenSize,
      height: parseInt(event.target.value, 10),
    });
  }

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    setScreenName(event.target.value);
  }

  return (
    <Container position={{ x: 400, y: 100 }} open>
      <TopBar>
        <Title>Set Screen propties</Title>
        <FiGrid
          color={theme.pallete.onPrimary}
          size={24}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </TopBar>

      <Body>
        <Secssion>
          <SecssionTitle>Screen name</SecssionTitle>

          <Content>
            <InputWrapper>
              <label>name</label>
              <input
                ref={inputNameRef}
                type="text"
                value={screenName}
                onChange={handleName}
              />
            </InputWrapper>
          </Content>
        </Secssion>

        <Secssion>
          <SecssionTitle>Screen size</SecssionTitle>

          <Content>
            <InputWrapper>
              <label>Width</label>
              <input
                type="number"
                value={screenSize.width}
                onChange={handleWidth}
              />
            </InputWrapper>

            <InputWrapper>
              <label>Height</label>
              <input
                type="number"
                value={screenSize.height}
                onChange={handleHeight}
              />
            </InputWrapper>
          </Content>
        </Secssion>
      </Body>

      <ButtonsWarapper>
        <Button onClick={handleDone}>Done</Button>
        <Button>Cancel</Button>
      </ButtonsWarapper>
    </Container>
  );
};

export default StartScreenPropties;
