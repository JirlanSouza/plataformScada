import React from 'react';

import { useAppContext } from '../../contexts';

import MenuBar from '../MenuBar'
import ToolBar from '../ToolBar';
import ActionsBar from '../ActionsBar';

import { Container } from './styles';

const Header: React.FC = () => {
  const { appClickEvent } = useAppContext();
  return (
    <Container
      onClick={appClickEvent}
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