import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../store';
import { edit } from '../../store/Object'

import { BackgroundProptiesEdit } from './BackgroundProptiesEdit';
import { BorderProptiesEdit } from './BorderProptiesEdit ';
import { FontProptiesEdit } from './FontProptiesEdit';
import { PositionAndSizeProptieEdit } from './PositionAndSizeProptieEdit';

import { Container, Menu, TopBar } from './styles';

import {
  FontPropties,
  BackgroundPropties,
  BorderPropties,
  PositionPropties,
  SizePropties
} from '../../core/object';

const ModalProptiesObject: React.FC<{ objectId: number }> = (props) => {
  const [menuItemSelected, setMenuItemSelected] = useState('style');

  const object = useAppSelector(state => state.objects.items[props.objectId])
  const dispatch = useAppDispatch()
  
  function getFontPropties(propties: FontPropties) {
    dispatch(edit({
      ...object,
      style: {
        ...object.style,
        font: propties
      }
    }));
  }

  function getBackgroundPropties(propties: BackgroundPropties) {
    dispatch(edit({
      ...object,
      style: {
        ...object.style,
        background: propties
      }
    }));
  }

  function getBorderPropties(propties: BorderPropties) {
    dispatch(edit({
      ...object,
      style: {
        ...object.style,
        border: propties
      }
    }));
  }

  function getPositionAnSizaPropties(propties: { position: PositionPropties, size: SizePropties }) {
    dispatch(edit({
      ...object,
      position: propties.position,
      size: propties.size
    }));
  }

  return (
    <Container>
      <TopBar>
        <Menu >
          <ul>
            <li onClick={() => setMenuItemSelected('style')} >Style</li>
            <li onClick={() => setMenuItemSelected('comon')} >Comon</li>
            <li onClick={() => setMenuItemSelected('conection')} >Conection</li>
          </ul>
        </Menu>
      </TopBar>

      {menuItemSelected === 'style' && (
        object.style.font &&
        <FontProptiesEdit propties={object.style.font} getPropties={getFontPropties} />
      )
      }

      {menuItemSelected === 'style' && (
        object.style.background &&
        <BackgroundProptiesEdit propties={object.style.background} getPropties={getBackgroundPropties} />
      )
      }

      {menuItemSelected === 'style' && (
        object.style.border &&
        <BorderProptiesEdit propties={object.style.border} getPropties={getBorderPropties} />
      )
      }

      {menuItemSelected === 'comon' && (
        object.style.border &&
        <PositionAndSizeProptieEdit
          propties={{ position: object.position, size: object.size }}
          getPropties={getPositionAnSizaPropties}
        />
      )
      }

    </Container>
  );
}

export default ModalProptiesObject;