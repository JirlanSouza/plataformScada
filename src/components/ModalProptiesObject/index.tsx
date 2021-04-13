import React, { useState } from 'react';

import { firstCharToUpCase } from '../../utils/firstCharToUperCase';

import { BackgroundProptiesEdit } from './BackgroundProptiesEdit';
import { BorderProptiesEdit } from './BorderProptiesEdit ';
import { FontProptiesEdit } from './FontProptiesEdit';
import { PositionAndSizeProptieEdit } from './PositionAndSizeProptieEdit';

import { Container, InputWrapper, Menu, TopBar } from './styles';

export interface ObjectProptiesToEdit {
  style: {
    font?: FontPropties,
    background?: BackgroundPropties,
    border?: BorderPropties
  },
  comon: {
    positionAndSize: PositionAndSizePropties
  },
  conection: {
    tag: string
  },
}

export interface FontPropties {
  size: number,
  color: string,
  bold: boolean,
  italic: boolean
}

export interface BackgroundPropties {
  color: string,
}

export interface BorderPropties {
  color: string,
  style: string,
  width: number
}

export interface PositionAndSizePropties {
  positionX: number,
  positionY: number,
  width: number,
  height: number
}

interface ObjectEdit {
  setPropties: ObjectProptiesToEdit,
  getPropties: (propties: ObjectProptiesToEdit) => void
}

const ModalProptiesObject: React.FC<ObjectEdit> = (props) => {
  const [menuItemSelected, setMenuItemSelected] = useState('style');

  function getFontPropties(propties: FontPropties) {
    props.getPropties({
      ...props.setPropties,
      style: {
        ...props.setPropties.style,
        font: propties
      }
    })
  }

  function getBackgroundPropties(propties: BackgroundPropties) {
    props.getPropties({
      ...props.setPropties,
      style: {
        ...props.setPropties.style,
        background: propties
      }
    })
  }

  function getBorderPropties(propties: BorderPropties) {
    props.getPropties({
      ...props.setPropties,
      style: {
        ...props.setPropties.style,
        border: propties
      }
    })
  }

  function getPositionAnSizaPropties(propties: PositionAndSizePropties) {
    props.getPropties({
      ...props.setPropties,
      comon: {
        positionAndSize: propties
      }
    })
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
        props.setPropties.style.font &&
        <FontProptiesEdit propties={props.setPropties.style.font} getPropties={getFontPropties} />
      )
      }

      {menuItemSelected === 'style' && (
        props.setPropties.style.background &&
        <BackgroundProptiesEdit propties={props.setPropties.style.background} getPropties={getBackgroundPropties} />
      )
      }

      {menuItemSelected === 'style' && (
        props.setPropties.style.border &&
        <BorderProptiesEdit propties={props.setPropties.style.border} getPropties={getBorderPropties} />
      )
      }

      {menuItemSelected === 'comon' && (
        props.setPropties.style.border &&
        <PositionAndSizeProptieEdit propties={props.setPropties.comon.positionAndSize} getPropties={getPositionAnSizaPropties} />
      )
      }

    </Container>
  );
}

export default ModalProptiesObject;