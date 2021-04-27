import React from 'react';

import { PositionPropties, SizePropties } from '../../../core/object';

import { Content, InputWrapper, Secssion, Title } from '../styles';

interface PositionAndSizePropties {
  position: PositionPropties;
  size: SizePropties;
}

interface IPositionAndSizeProptieEdit {
  propties: PositionAndSizePropties;
  getPropties: (propties: PositionAndSizePropties) => void;
}

export const PositionAndSizeProptieEdit: React.FC<IPositionAndSizeProptieEdit> = (
  props
) => {
  function handlePositionX(event: React.ChangeEvent<HTMLInputElement>) {
    props.getPropties({
      ...props.propties,
      position: {
        ...props.propties.position,
        x: parseInt(event.target.value, 10),
      },
    });
  }

  function handlePositionY(event: React.ChangeEvent<HTMLInputElement>) {
    props.getPropties({
      ...props.propties,
      position: {
        ...props.propties.position,
        y: parseInt(event.target.value, 10),
      },
    });
  }

  function handleWidth(event: React.ChangeEvent<HTMLInputElement>) {
    props.getPropties({
      ...props.propties,
      size: {
        ...props.propties.size,
        width: parseInt(event.target.value, 10),
      },
    });
  }

  function handleHeight(event: React.ChangeEvent<HTMLInputElement>) {
    props.getPropties({
      ...props.propties,
      size: {
        ...props.propties.size,
        height: parseInt(event.target.value, 10),
      },
    });
  }

  return (
    <>
      <Secssion>
        <Title>Position</Title>
        <Content>
          <InputWrapper>
            <label>Position X</label>
            <input
              type="number"
              value={props.propties.position.x}
              onChange={handlePositionX}
            />
          </InputWrapper>

          <InputWrapper>
            <label>Position Y</label>
            <input
              type="number"
              value={props.propties.position.y}
              onChange={handlePositionY}
            />
          </InputWrapper>
        </Content>
      </Secssion>

      <Secssion>
        <Title>Size</Title>
        <Content>
          <InputWrapper>
            <label>Width</label>
            <input
              type="number"
              value={props.propties.size.width}
              onChange={handleWidth}
            />
          </InputWrapper>

          <InputWrapper>
            <label>Height</label>
            <input
              type="number"
              value={props.propties.size.height}
              onChange={handleHeight}
            />
          </InputWrapper>
        </Content>
      </Secssion>
    </>
  );
};
