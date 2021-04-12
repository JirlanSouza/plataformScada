import React, { useState } from 'react';

import { firstCharToUpCase } from '../../utils/firstCharToUperCase';

import ColorSelection from '../ColorSelection';
import { BackgroundProptiesEdit } from './BackgroundProptiesEdit';
import { BorderProptiesEdit } from './BorderProptiesEdit ';
import { FontProptiesEdit } from './FontProptiesEdit';

import { Container, Content, InputWrapper, Menu, Secssion, Title, TopBar } from './styles';

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



const InputNumber: React.FC<{ name: string, propties: any }> = (props) => {
  const [value, setValue] = useState(0);

  function handleValue(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(event.target.value);
    if (newValue < props.propties.minValue) {
      setValue(props.propties.minValue);
      return;
    }

    if (newValue > props.propties.maxValue) {
      setValue(props.propties.maxValue);
      return;
    }

    setValue(newValue);
  }

  return (
    <InputWrapper>
      <label>{firstCharToUpCase(props.name)}</label>
      <input type='number' value={value} onChange={handleValue} />
    </InputWrapper>
  )
}

const InputRadio: React.FC<{ name: string, propties: any }> = (props) => {
  return (
    <InputWrapper>
      <label>{firstCharToUpCase(props.name)}</label>
      <input type='radio' />
    </InputWrapper>
  )
}

const InputSelect: React.FC<{ name: string, propties: any }> = (props) => {
  const [propties, setPropyies] = useState(props.propties as InputSelectPropties);

  interface InputSelectPropties {
    options: string[]
  }

  props.propties as InputSelectPropties;
  return (
    <InputWrapper>
      <label>{firstCharToUpCase(props.name)}</label>
      <select>
        {propties.options.map((option, index) => {
          return (
            <option>{firstCharToUpCase(option)}</option>
          )
        })}
      </select>
    </InputWrapper>
  )
}

const ModalProptiesObject: React.FC<{ objectPropties: ObjectProptiesToEdit }> = (props) => {
  const [menuItemSelected, setMenuItemSelected] = useState('style');

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
        props.objectPropties.style.font &&
        <FontProptiesEdit propties={props.objectPropties.style.font} />
      )
      }

      {menuItemSelected === 'style' && (
        props.objectPropties.style.background &&
        <BackgroundProptiesEdit propties={props.objectPropties.style.background} />
      )
      }

      {menuItemSelected === 'style' && (
        props.objectPropties.style.border &&
        <BorderProptiesEdit propties={props.objectPropties.style.border} />
      )
      }

    </Container>
  );
}

export default ModalProptiesObject;