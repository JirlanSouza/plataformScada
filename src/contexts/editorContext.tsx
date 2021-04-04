import React, { createContext, useContext,  useState } from 'react';

interface EditorContext {
  lineGridWeight: number;
  setLineGridWeight: (value: number) => void
}

const EditorContext = createContext({} as EditorContext);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [lineGridWeight, setLineGridWeight] = useState(20);

  return (
    <EditorContext.Provider
      value = {{
      lineGridWeight,
      setLineGridWeight
      }}
    >
      { children}
    </EditorContext.Provider >
  );
}

export function useEditorContext (): EditorContext {
  return useContext(EditorContext);
}