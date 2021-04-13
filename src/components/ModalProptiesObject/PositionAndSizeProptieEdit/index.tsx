import React from "react";

import { Content, InputWrapper, Secssion, Title } from "../styles";
import { PositionAndSizePropties } from '..';

interface IPositionAndSizeProptieEdit {
  propties: PositionAndSizePropties,
  getPropties: (propties: PositionAndSizePropties) => void
}

export const PositionAndSizeProptieEdit: React.FC<IPositionAndSizeProptieEdit> = (props) => {
  function handlePositionX(event: React.ChangeEvent<HTMLInputElement>) {
    props.getPropties({
      ...props.propties,
      positionX: parseInt(event.target.value)
    })
  }

  function handlePositionY(event: React.ChangeEvent<HTMLInputElement>) {
    props.getPropties({
      ...props.propties,
      positionY: parseInt(event.target.value)
    })
  }


  function handleWidth(event: React.ChangeEvent<HTMLInputElement>) {
    props.getPropties({
      ...props.propties,
      width: parseInt(event.target.value)
    })
  }


  function handleHeight(event: React.ChangeEvent<HTMLInputElement>) {
    props.getPropties({
      ...props.propties,
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
            <input type='number' value={props.propties.positionX} onChange={handlePositionX} />
          </InputWrapper>

          <InputWrapper>
            <label>Position Y</label>
            <input type='number' value={props.propties.positionY} onChange={handlePositionY} />
          </InputWrapper>
        </Content>
      </Secssion>

      <Secssion>
        <Title>Size</Title>
        <Content>
          <InputWrapper>
            <label>Width</label>
            <input type='number' value={props.propties.width} onChange={handleWidth} />
          </InputWrapper>

          <InputWrapper>
            <label>Height</label>
            <input type='number' value={props.propties.height} onChange={handleHeight} />
          </InputWrapper>
        </Content>
      </Secssion>
    </>
  )
}