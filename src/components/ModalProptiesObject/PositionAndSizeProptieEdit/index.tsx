import React, { useState } from "react";

import { Content, InputWrapper, Secssion, Title } from "../styles";
import { PositionAndSizePropties } from '..';

export const PositionAndSizeProptieEdit: React.FC<{ propties: PositionAndSizePropties }> = (props) => {
  const [positionAndSizePropties, setPositionAndSizePropties] = useState({} as PositionAndSizePropties);

  function handlePositionX(event: React.ChangeEvent<HTMLInputElement>) {
    setPositionAndSizePropties({
      ...positionAndSizePropties,
      positionX: parseInt(event.target.value)
    })
  }

  function handlePositionY(event: React.ChangeEvent<HTMLInputElement>) {
    setPositionAndSizePropties({
      ...positionAndSizePropties,
      positionY: parseInt(event.target.value)
    })
  }


  function handleWidth(event: React.ChangeEvent<HTMLInputElement>) {
    setPositionAndSizePropties({
      ...positionAndSizePropties,
      width: parseInt(event.target.value)
    })
  }


  function handleHeight(event: React.ChangeEvent<HTMLInputElement>) {
    setPositionAndSizePropties({
      ...positionAndSizePropties,
      height: parseInt(event.target.value)
    })
  }



  return (
    <>
      <Secssion>
        <Title>Position</Title>
        <Content>
          <InputWrapper>
            <label>Position X</label>
            <input type='number' value={positionAndSizePropties.positionX} onChange={handlePositionX} />
          </InputWrapper>

          <InputWrapper>
            <label>Position Y</label>
            <input type='number' value={positionAndSizePropties.positionY} onChange={handlePositionY} />
          </InputWrapper>
        </Content>
      </Secssion>

      <Secssion>
        <Title>Size</Title>
        <Content>
          <InputWrapper>
            <label>Width</label>
            <input type='number' value={positionAndSizePropties.width} onChange={handleWidth} />
          </InputWrapper>

          <InputWrapper>
            <label>Height</label>
            <input type='number' value={positionAndSizePropties.height} onChange={handleHeight} />
          </InputWrapper>
        </Content>
      </Secssion>
    </>
  )
}