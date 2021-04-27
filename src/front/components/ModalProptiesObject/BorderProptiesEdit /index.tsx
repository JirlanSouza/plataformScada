import React from 'react';

import { BorderPropties } from '../../../core/object';
import ColorSelection from '../../ColorSelection';
import { Content, InputWrapper, Secssion, Title } from '../styles';

interface IBorderProptiesEdit {
  propties: BorderPropties;
  getPropties: (propties: BorderPropties) => void;
}

export const BorderProptiesEdit: React.FC<IBorderProptiesEdit> = (props) => {
  function handleBorderColor(color: string) {
    props.getPropties({
      ...props.propties,
      color,
    });
  }

  function handlehandleBorderStyle(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    props.getPropties({
      ...props.propties,
      style: event.target.value,
    });
  }

  function handleBorderWidth(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(event.target.value, 10) || 0;
    if (newValue <= 0) {
      props.getPropties({
        ...props.propties,
        width: 0,
      });
      return;
    }

    if (newValue > 100) {
      props.getPropties({
        ...props.propties,
        width: 100,
      });
      return;
    }

    props.getPropties({
      ...props.propties,
      width: newValue,
    });
  }

  return (
    <Secssion>
      <Title>Border</Title>

      <Content>
        <InputWrapper>
          <label>Color</label>
          <ColorSelection
            setColor={props.propties.color}
            getColor={handleBorderColor}
          />
        </InputWrapper>

        <InputWrapper>
          <label>Style</label>
          <select
            value={props.propties.style}
            onChange={handlehandleBorderStyle}
          >
            <option>Solid</option>
            <option>Dotted</option>
            <option>Dashad</option>
            <option>Double</option>
          </select>
        </InputWrapper>

        <InputWrapper>
          <label>width</label>
          <input
            type="number"
            value={props.propties.width}
            onChange={handleBorderWidth}
          />
        </InputWrapper>
      </Content>
    </Secssion>
  );
};
