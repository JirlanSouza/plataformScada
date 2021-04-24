import React from 'react';

import { ButtonsWarapper, ButtonStyle } from './styles';

const Button: React.FC<{ onClick?: () => void}> = (props) => {
  return (
    <ButtonStyle {...props} >
      {props.children}
    </ButtonStyle>
  );
}

export { Button, ButtonsWarapper };