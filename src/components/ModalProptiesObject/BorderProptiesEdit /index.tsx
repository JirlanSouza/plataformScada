import React, { useState } from "react";

import ColorSelection from "../../ColorSelection";
import { Content, InputWrapper, Secssion, Title } from "../styles";
import { BorderPropties } from '../';

export const BorderProptiesEdit: React.FC<{ propties: BorderPropties }> = (props) => {
  const [borderPropties, setBorderPropties] = useState({} as BorderPropties);

  function handleBorderColor(color: string) {
    setBorderPropties({
      ...borderPropties,
      color
    })
  }

  function handlehandleBorderStyle(event: React.ChangeEvent<HTMLSelectElement>) {
    setBorderPropties({
      ...borderPropties,
      style: event.target.value
    })
  }

  function handleBorderWidth(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(event.target.value);
    if (newValue < 0) {
      setBorderPropties({
        ...borderPropties,
        width: 0
      });
      return;
    }

    if (newValue > 100) {
      setBorderPropties({
        ...borderPropties,
        width: 100
      })
      return;
    }

    setBorderPropties({
      ...borderPropties,
      width: newValue
    })
  }

  return (
    <Secssion>
      <Title>Border</Title>

      <Content>
        <InputWrapper>
          <label>Color</label>
          <ColorSelection setColor={borderPropties.color} getColor={handleBorderColor} />
        </InputWrapper>

        <InputWrapper>
          <label>Style</label>
          <select value={borderPropties.style} onChange={handlehandleBorderStyle} >
            <option>Solid</option>
            <option>Dotted</option>
            <option>Dashad</option>
            <option>Double</option>
          </select>
        </InputWrapper>

        <InputWrapper>
          <label>width</label>
          <input type='number' value={borderPropties.width} onChange={handleBorderWidth} />
        </InputWrapper>
      </Content>
    </Secssion>
  )
}