import React, { createContext, useContext,  useState } from 'react';

interface KeyEventProps {
  keyPressed: string,
  isKeyCtrl: boolean,
  isKeyShift: boolean,
  isKeyAlt: boolean
}

type FunctionMouseEvent = (event: React.MouseEvent) => void

interface IAppContext {
  keysPressed: KeyEventProps;
  setKeysPressed: (keyEventProps: KeyEventProps) => void
  appClickEvent: FunctionMouseEvent;
  appClickEventSubScribe: (fn: FunctionMouseEvent) => void;
  
}

const AppContext = createContext({} as IAppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [keysPressed, setKeysPressed] = useState({
    keyPressed: '',
    isKeyCtrl: false,
    isKeyShift: false,
    isKeyAlt: false
  });

  const [subScribers, setSubScribers] = useState([] as FunctionMouseEvent[]);

  function appClickEvent (event: React.MouseEvent) {
    console.log('========> APP CLICK <=======')
    subScribers.forEach(subScriber => {
      subScriber(event);
    })
  }

  function appClickEventSubScribe (fn: (event: React.MouseEvent) => void) {
    setSubScribers([...subScribers, fn]);
    console.log(subScribers, fn);
  }

  return (
    <AppContext.Provider
      value = {{
      keysPressed,
      setKeysPressed,
      appClickEvent,
      appClickEventSubScribe
      }}
    >
      { children}
    </AppContext.Provider >
  );
}

export function useAppContext (): IAppContext {
  return useContext(AppContext);
}