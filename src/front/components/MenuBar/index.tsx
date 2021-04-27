import React from 'react';

import { Container } from './styles';

const MenuBar: React.FC = () => {
  const menuItems = ['file', 'edit', 'view', 'object', 'animation', 'help'];
  return (
    <Container>
      <ul>
        {menuItems.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </Container>
  );
};

export default MenuBar;
