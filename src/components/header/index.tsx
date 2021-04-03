import React from 'react';

import MenuBar from '../MenuBar'

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      Header
    </Container>
  );
}

export default Header;