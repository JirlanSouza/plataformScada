import React from 'react';

import MenuBar from '../MenuBar'
import ToolBar from '../ToolBar';
import ActionsBar from '../ActionsBar';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container
      // onKeyDown={(event) => setKeyPressed(event.key)}
      tabIndex={0}
      >
      <MenuBar />
      <ActionsBar />
      <ToolBar />
    </Container>
  );
}

export default Header;