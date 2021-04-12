import React, { useState } from "react";

import ColorSelection from "../../ColorSelection";
import { Content, InputWrapper, Secssion, Title } from "../styles";
import { BackgroundPropties } from '..';

export const BackgroundProptiesEdit: React.FC<{ propties: BackgroundPropties }> = (props) => {
  const [backgroundPropties, setBackgroundPropties] = useState({} as BackgroundPropties);

  function handleBackgroundColor(color: string) {
    setBackgroundPropties({ color });
  }

  return (
    <Secssion>
      <Title>Background</Title>

      <Content>
      <InputWrapper>
        <label>Color</label>
        <ColorSelection setColor={backgroundPropties.color} getColor={handleBackgroundColor} />
      </InputWrapper>
      </Content>
    </Secssion>
  )}