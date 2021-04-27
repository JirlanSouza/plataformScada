import React, { createContext, useContext, useState } from 'react';
import { ObjectsTypes } from '../projectObjects';

interface IEditorContext {
  lineGridWeight: number;
  setLineGridWeight: (value: number) => void;
  toolSelected: ObjectsTypes;
  setToolSelected: (tool: ObjectsTypes) => void;
  keyPressed: string;
  setKeyPressed: (key: string) => void;
  basicsColors: string[];
  favoriteColors: string[];
  setFavoriteColors: (colors: string[]) => void;
}

const EditorContext = createContext({} as IEditorContext);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [lineGridWeight, setLineGridWeight] = useState(20);
  const [toolSelected, setToolSelected] = useState('Cursor' as ObjectsTypes);
  const [keyPressed, setKeyPressed] = useState('');
  const [basicsColors, setBasicColors] = useState([
    '#201B2D',
    '#FF79C6',
    '#e7de79',
    '#67e480',
    '#78D1E1',
    '#988bc7',
    '#A1EFE4',
    '#E1E1E6',
    '#626483',
    '#ed4556',
    '#e7de79',
    '#00F769',
    '#78D1E1',
    '#988bc7',
    '#A4FFFF',
    '#F7F7FB',
  ]);
  const [favoriteColors, setFavoriteColors] = useState([] as string[]);

  return (
    <EditorContext.Provider
      value={{
        lineGridWeight,
        setLineGridWeight,
        toolSelected,
        setToolSelected,
        keyPressed,
        setKeyPressed,
        basicsColors,
        favoriteColors,
        setFavoriteColors,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export function useEditorContext(): IEditorContext {
  return useContext(EditorContext);
}
