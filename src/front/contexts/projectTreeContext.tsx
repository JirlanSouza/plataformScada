import React, { createContext, useContext, useState } from 'react';

interface ProjectTreeResize {
  containerWidth: number;
  setContainerWidth: (value: number) => void;
  positionBorderContainer: number;
  setPositionBorderContainer: (value: number) => void;
  isClickedBorderContainer: boolean;
  setIsClickedBorderContainer: (state: boolean) => void;
}

const ProjectTreeContext = createContext({} as ProjectTreeResize);

export const ProjectTreeContextProvider: React.FC = ({ children }) => {
  const [containerWidth, setContainerWidth] = useState(250);
  const [positionBorderContainer, setPositionBorderContainer] = useState(250);
  const [isClickedBorderContainer, setIsClickedBorderContainer] = useState(
    false
  );

  return (
    <ProjectTreeContext.Provider
      value={{
        containerWidth,
        setContainerWidth,
        positionBorderContainer,
        setPositionBorderContainer,
        isClickedBorderContainer,
        setIsClickedBorderContainer,
      }}
    >
      {children}
    </ProjectTreeContext.Provider>
  );
};

export function useProjectTreeContext(): ProjectTreeResize {
  return useContext(ProjectTreeContext);
}
