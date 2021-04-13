import React from "react";

import ColorSelection from "../../ColorSelection";
import { Content, InputWrapper, Secssion, Title } from "../styles";
import { BackgroundPropties } from '..';

interface IBackgroundProptiesEdit {
  propties: BackgroundPropties,
  getPropties: (propties: BackgroundPropties) => void
}

export const BackgroundProptiesEdit: React.FC<IBackgroundProptiesEdit> = (props) => {
  function handleBackgroundColor(color: string) {
    props.getPropties({ color });
  }

  return (
    <Secssion>
      <Title>Background</Title>

      <Content>
      <InputWrapper>
        <label>Color</label>
        <ColorSelection setColor={props.propties.color} getColor={handleBackgroundColor} />
      </InputWrapper>
      </Content>
    </Secssion>
  )}