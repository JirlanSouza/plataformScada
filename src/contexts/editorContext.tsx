import React, { createContext, useContext,  useState } from 'react';

interface EditorContext {
  lineGridWeight: number;
  setLineGridWeight: (value: number) => void;
  toolSelected: string;
  setToolSelected: (tool: string) => void
}

const EditorContext = createContext({} as EditorContext);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [lineGridWeight, setLineGridWeight] = useState(20);
  const [toolSelected, setToolSelected] = useState('cursor');

  return (
    <EditorContext.Provider
      value = {{
      lineGridWeight,
      setLineGridWeight,
      toolSelected,
      setToolSelected
      }}
    >
      { children}
    </EditorContext.Provider >
  );
}

export function useEditorContext (): EditorContext {
  return useContext(EditorContext);
}