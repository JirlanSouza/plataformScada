import React, { useState } from "react";

import ColorSelection from "../../ColorSelection";
import { Content, InputWrapper, Secssion, Title } from "../styles";
import { FontPropties } from '../';

export const FontProptiesEdit: React.FC<{ propties: FontPropties }> = (props) => {
  const [fontPropties, setFontPropties] = useState({} as FontPropties);

  function handleFontSize(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(event.target.value);
    if (newValue < 7) {
      setFontPropties({
        ...fontPropties,
        size: 7
      });
      return;
    }

    if (newValue > 64) {
      setFontPropties({
        ...fontPropties,
        size: 64
      });
      return;
    }

    setFontPropties({
      ...fontPropties,
      size: newValue
    });
  }

  function handleFontColor (color: string) {
    setFontPropties({
      ...fontPropties,
      color
    });
  }

  function handleFontBold (event: React.ChangeEvent<HTMLInputElement>) {
    setFontPropties({
      ...fontPropties,
      bold: Boolean(event.target.value)
    });
  }

  function handleFontItalic (event: React.ChangeEvent<HTMLInputElement>) {
    setFontPropties({
      ...fontPropties,
      italic: Boolean(event.target.value)
    });
  }

  return (
    <Secssion>
      <Title>Font</Title>

      <Content>
      <InputWrapper>
        <label>Size</label>
        <input type='number' value={fontPropties.size} onChange={handleFontSize} />
      </InputWrapper>

      <InputWrapper>
        <label>Color</label>
        <ColorSelection setColor={fontPropties.color} getColor={handleFontColor} />
      </InputWrapper>

      <InputWrapper>
        <label>Bold</label>
        <input type='radio' value={String(fontPropties.bold)} onChange={handleFontBold} />
      </InputWrapper>

      <InputWrapper>
        <label>Italic</label>
        <input type='radio' value={String(fontPropties.italic)} onChange={handleFontItalic} />
      </InputWrapper>
      </Content>
    </Secssion>
  )}