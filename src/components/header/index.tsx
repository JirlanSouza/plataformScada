import React from 'react';

import MenuBar from '../MenuBar'
import ToolBar from '../ToolBar';
import ActionsBar from '../ActionsBar';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <ActionsBar />
      <ToolBar />
    </Container>
  );
}

export default Header;