import React from 'react';

import { Container } from './styles';

export interface InsertingObjectAreaState {
  isInserting: boolean,
  positionX: number,
  positionY: number,
  width: number,
  height: number
}

const InsertingObjectArea: React.FC<{InsertingObjectAreaState: InsertingObjectAreaState}> = ({
  InsertingObjectAreaState
}) => {
  return <Container insertingObjectAreaState={InsertingObjectAreaState} />;
}

export default InsertingObjectArea;