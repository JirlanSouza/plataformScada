import React, { useState } from "react";

import { FontPropties } from '../../../core/object';
import ColorSelection from "../../ColorSelection";
import { Content, InputWrapper, Secssion, Title } from "../styles";
import { TogleSwitch } from "../../Checkbox";

interface IFontProptiesEdit {
  propties: FontPropties,
  getPropties: (propties: FontPropties) => void
}

export const FontProptiesEdit: React.FC<IFontProptiesEdit> = (props) => {
  const [bold, setBold] = useState(false);

  function handleFontSize(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(event.target.value);
    if (newValue < 7) {
      props.getPropties({
        ...props.propties,
        size: 7
      });
      return;
    }

    if (newValue > 64) {
      props.getPropties({
        ...props.propties,
        size: 64
      });
      return;
    }

    props.getPropties({
      ...props.propties,
      size: newValue
    });
  }

  function handleFontColor (color: string) {
    props.getPropties({
      ...props.propties,
      color
    });
  }

  function handleFontBold (value: boolean) {
    props.getPropties({
      ...props.propties,
      bold: value
    });
    console.log(value, props.propties.bold);
  }

  function handleFontItalic (value: boolean) {
    props.getPropties({
      ...props.propties,
      italic: value
    });
    console.log(value, props.propties.italic);
  }

  return (
    <Secssion>
      <Title>Font</Title>

      <Content>
      <InputWrapper>
        <label>Size</label>
        <input type='number' value={props.propties.size} onChange={handleFontSize} />
      </InputWrapper>

      <InputWrapper>
        <label>Color</label>
        <ColorSelection setColor={props.propties.color} getColor={handleFontColor} />
      </InputWrapper>

      <InputWrapper>
        <label>Bold</label>
        <TogleSwitch setValue={props.propties.bold} getValue={handleFontBold} />
      </InputWrapper>

      <InputWrapper>
        <label>Italic</label>
        <TogleSwitch setValue={props.propties.italic} getValue={handleFontItalic} />
      </InputWrapper>
      </Content>
    </Secssion>
  )}