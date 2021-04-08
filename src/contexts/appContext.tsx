import React, { createContext, useContext,  useState } from 'react';

interface KeyEventProps {
  keyPressed: string,
  isKeyCtrl: boolean,
  isKeyShift: boolean,
  isKeyAlt: boolean
}

interface IAppContext {
  keysPressed: KeyEventProps;
  setKeysPressed: (keyEventProps: KeyEventProps) => void
  
}

const AppContext = createContext({} as IAppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [keysPressed, setKeysPressed] = useState({
    keyPressed: '',
    isKeyCtrl: false,
    isKeyShift: false,
    isKeyAlt: false
  });

  return (
    <AppContext.Provider
      value = {{
      keysPressed,
      setKeysPressed
      }}
    >
      { children}
    </AppContext.Provider >
  );
}

export function useAppContext (): IAppContext {
  return useContext(AppContext);
}