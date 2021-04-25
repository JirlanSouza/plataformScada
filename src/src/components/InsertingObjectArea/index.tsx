import React from 'react';

import { Container } from './styles';

export interface InsertingObjectAreaState {
  isInserting: boolean,
  position: {
    x: number,
    y: number,
  },
  size: {
    width: number,
    height: number
  }
}

const InsertingObjectArea: React.FC<{InsertingObjectAreaState: InsertingObjectAreaState}> = ({
  InsertingObjectAreaState
}) => {
  return <Container insertingObjectAreaState={InsertingObjectAreaState} />;
}

export default InsertingObjectArea;