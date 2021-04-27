import React, { useEffect, useState } from 'react';

import { ObjectComponent } from '../ObjectPorpties';

import { Container } from './styles';

let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array = array.reverse();

export const BarGraph: ObjectComponent = (props) => {
  const [fullContainer, setFullContainer] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [barPositionX, setBarPositionX] = useState(0);
  const [barPositionY, setBarPositionY] = useState(0);
  const [valuePercentage, setValuePercentage] = useState(27);

  useEffect(() => {
    if (props.size.width > 120) {
      setFullContainer(false);
    } else {
      setFullContainer(true);
    }
  }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (fullContainer) {
      setBarWidth(props.size.width);
      setBarHeight(calcHeightBar(props.size.height, valuePercentage));
      setBarPositionX(0);
      setBarPositionY(props.size.height - barHeight);
      return;
    }

    const barHeightUpdate = calcHeightBar(
      props.size.height - 40,
      valuePercentage
    );

    setBarWidth(props.size.width - 60);
    setBarHeight(barHeightUpdate);
    setBarPositionX(10);
    setBarPositionY(props.size.height - (barHeightUpdate + 40));
  }, [fullContainer, props]); // eslint-disable-line react-hooks/exhaustive-deps

  function calcHeightBar(objectHeight: number, percentage: number) {
    return (objectHeight / 100) * percentage;
  }

  return (
    <Container
      position={props.position}
      size={props.size}
      objectStyle={props.style}
      onClick={() => props.onClick(props.objectIdentify)}
      onDoubleClick={() => props.onDoubleClick(props.objectIdentify)}
    >
      <svg width={props.size.width} height={props.size.height}>
        <g transform={fullContainer ? '' : `translate(40,20)`}>
          {!fullContainer && (
            <g className="y axis">
              {array.map((item, index) => {
                return (
                  <g
                    key={index}
                    className="tick"
                    transform={`translate(0,${
                      index * ((props.size.height - 40) / 10)
                    })`}
                  >
                    <line x2="-6" y2="0" />
                    <text dy=".32em" x="-9" y="0">
                      {(item + 1) * 10}%
                    </text>
                  </g>
                );
              })}

              <path
                className="domain"
                d={`M-6,0H0V${props.size.height - 40}H-6`}
              />
            </g>
          )}
          <rect
            className="bar"
            x={barPositionX}
            width={barWidth}
            y={barPositionY}
            height={barHeight}
          />
        </g>
      </svg>
    </Container>
  );
};
