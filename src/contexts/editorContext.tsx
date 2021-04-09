import React, { createContext, useContext,  useState } from 'react';

interface IEditorContext {
  lineGridWeight: number;
  setLineGridWeight: (value: number) => void;
  toolSelected: string;
  setToolSelected: (tool: string) => void
  keyPressed: string;
  setKeyPressed: (key: string) => void
}

const EditorContext = createContext({} as IEditorContext);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [lineGridWeight, setLineGridWeight] = useState(20);
  const [toolSelected, setToolSelected] = useState('Cursor');
  const [keyPressed, setKeyPressed] = useState('');

  return (
    <EditorContext.Provider
      value = {{
      lineGridWeight,
      setLineGridWeight,
      toolSelected,
      setToolSelected,
      keyPressed,
      setKeyPressed
      }}
    >
      { children}
    </EditorContext.Provider >
  );
}

export function useEditorContext (): IEditorContext {
  return useContext(EditorContext);
}