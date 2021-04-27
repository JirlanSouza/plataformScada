import React, { createContext, useContext, useState } from 'react';

interface KeyEventProps {
  keyPressed: string;
  isKeyCtrl: boolean;
  isKeyShift: boolean;
  isKeyAlt: boolean;
}

type KeyEvent = 'Delete' | 'Ctrl + Shift';

const KeyEvents = [
  {
    name: 'Delete',
    keyEventProps: {
      keyPressed: 'Delete',
      isKeyCtrl: false,
      isKeyShift: false,
      isKeyAlt: false,
    },
  },
  {
    name: 'Delete',
    keyPressed: 'Delete',
    isKeyCtrl: true,
    isKeyShift: true,
    isKeyAlt: false,
  },
];

type FunctionMouseEvent = (event: React.MouseEvent) => void;
interface KeyEventSubScriber {
  keyEvent: KeyEvent;
  fn: () => void;
}

interface IAppContext {
  keyEvent: KeyEventProps;
  appKeyPressedEvent: (keyEventProps: KeyEventProps) => void;
  appClickEvent: FunctionMouseEvent;
  appClickEventSubScribe: (fn: FunctionMouseEvent) => void;
  appKeyEventSubcribe: (subScriber: KeyEventSubScriber) => void;
}

function eventKeyPorpsIsIgual(props1: KeyEventProps, props2: KeyEventProps) {
  let hasPropsNotIgual = false;
  hasPropsNotIgual = props1.keyPressed !== props2.keyPressed;

  if (!hasPropsNotIgual) {
    hasPropsNotIgual = props1.isKeyCtrl !== props2.isKeyCtrl;
  }

  if (!hasPropsNotIgual) {
    hasPropsNotIgual = props1.isKeyShift !== props2.isKeyShift;
  }

  if (!hasPropsNotIgual) {
    hasPropsNotIgual = props1.isKeyAlt !== props2.isKeyAlt;
  }

  return !hasPropsNotIgual;
}

const AppContext = createContext({} as IAppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [keyEvent, setKeysPressed] = useState({
    keyPressed: '',
    isKeyCtrl: false,
    isKeyShift: false,
    isKeyAlt: false,
  });

  const [subScribers, setSubScribers] = useState([] as FunctionMouseEvent[]);
  const [keyEventSubScribers, setKeyEventSubScribers] = useState(
    [] as KeyEventSubScriber[]
  );

  function appClickEvent(event: React.MouseEvent) {
    subScribers.forEach((subScriber) => {
      subScriber(event);
    });
  }

  function appClickEventSubScribe(fn: (event: React.MouseEvent) => void) {
    setSubScribers([...subScribers, fn]);
    console.log(subScribers, fn);
  }

  function appKeyPressedEvent(keyEventProps: KeyEventProps) {
    keyEventSubScribers.forEach((subScriber) => {
      const keyEvent = KeyEvents.find(
        (keyEvent) => keyEvent.name === subScriber.keyEvent
      );

      if (
        keyEvent?.keyEventProps &&
        eventKeyPorpsIsIgual(keyEventProps, keyEvent?.keyEventProps)
      ) {
        subScriber.fn();
      }
    });
  }

  function appKeyEventSubcribe(subScriber: KeyEventSubScriber) {
    setKeyEventSubScribers([...keyEventSubScribers, subScriber]);
  }

  return (
    <AppContext.Provider
      value={{
        keyEvent,
        appKeyPressedEvent,
        appClickEvent,
        appClickEventSubScribe,
        appKeyEventSubcribe,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext(): IAppContext {
  return useContext(AppContext);
}
