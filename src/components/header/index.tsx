import React from 'react';

import MenuBar from '../MenuBar'
import ToolBar from '../ToolBar';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <ToolBar />
    </Container>
  );
}

export default Header;