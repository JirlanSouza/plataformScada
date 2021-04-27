import React, { useEffect, useState } from 'react';

import { FiGrid } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../store';
import { screenActions } from '../../store/screens';

import { BackgroundProptiesEdit } from './BackgroundProptiesEdit';
import { BorderProptiesEdit } from './BorderProptiesEdit ';
import { FontProptiesEdit } from './FontProptiesEdit';
import { PositionAndSizeProptieEdit } from './PositionAndSizeProptieEdit';
import { Button, ButtonsWarapper } from '../ui/Button';

import { Body, Container, Menu, TopBar } from './styles';

import {
  FontPropties,
  BackgroundPropties,
  BorderPropties,
  PositionPropties,
  SizePropties,
} from '../../core/object';
import { theme } from '../../styles/theme';
import { moveDialog } from '../../store/diologObjectProptiesEdit';

const ModalProptiesObject: React.FC<{
  objectId: number;
  open: boolean;
  screenMouseMove: { x: number; y: number };
  screenMouseUp: boolean;
}> = (props) => {
  const [menuItemSelected, setMenuItemSelected] = useState('style');
  const [movingDialog, setMovingDialog] = useState(false);
  const [positionDiffDialog, setPositionDiffDialog] = useState({ x: 0, y: 0 });

  const object = useAppSelector(
    (state) => state.screens[0].objects.items[props.objectId]
  );
  const dialogObjectProptiesEdit = useAppSelector(
    (state) => state.dilogObjectProptiesEdit
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleMouseUp();
  }, [props.screenMouseUp]);

  useEffect(() => {
    handleMoveDialog(props.screenMouseMove);
  }, [props.screenMouseMove]);

  function getFontPropties(propties: FontPropties) {
    dispatch(
      screenActions.editObject({
        ...object,
        id: props.objectId,
        style: {
          ...object.style,
          font: propties,
        },
      })
    );
  }

  function getBackgroundPropties(propties: BackgroundPropties) {
    dispatch(
      screenActions.editObject({
        ...object,
        id: props.objectId,
        style: {
          ...object.style,
          background: propties,
        },
      })
    );
  }

  function getBorderPropties(propties: BorderPropties) {
    dispatch(
      screenActions.editObject({
        ...object,
        id: props.objectId,
        style: {
          ...object.style,
          border: propties,
        },
      })
    );
  }

  function getPositionAnSizePropties(propties: {
    position: PositionPropties;
    size: SizePropties;
  }) {
    dispatch(
      screenActions.editObject({
        ...object,
        id: props.objectId,
        position: propties.position,
        size: propties.size,
      })
    );
  }

  function handleDone() {
    dispatch(screenActions.unEditingProptiesObject(props.objectId));
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

  return (
    <Container position={dialogObjectProptiesEdit.position} open={props.open}>
      <TopBar>
        <Menu>
          <ul>
            <li onClick={() => setMenuItemSelected('style')}>Style</li>
            <li onClick={() => setMenuItemSelected('comon')}>Comon</li>
            <li onClick={() => setMenuItemSelected('conection')}>Conection</li>
          </ul>
        </Menu>
        <FiGrid
          color={theme.pallete.onPrimary}
          size={24}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </TopBar>

      <Body>
        {menuItemSelected === 'style' && object.style.font && (
          <FontProptiesEdit
            propties={object.style.font}
            getPropties={getFontPropties}
          />
        )}

        {menuItemSelected === 'style' && object.style.background && (
          <BackgroundProptiesEdit
            propties={object.style.background}
            getPropties={getBackgroundPropties}
          />
        )}

        {menuItemSelected === 'style' && object.style.border && (
          <BorderProptiesEdit
            propties={object.style.border}
            getPropties={getBorderPropties}
          />
        )}

        {menuItemSelected === 'comon' && (
          <PositionAndSizeProptieEdit
            propties={{ position: object.position, size: object.size }}
            getPropties={getPositionAnSizePropties}
          />
        )}
      </Body>

      <ButtonsWarapper>
        <Button onClick={handleDone}>Done</Button>
        <Button>Cancel</Button>
      </ButtonsWarapper>
    </Container>
  );
};

export default ModalProptiesObject;
