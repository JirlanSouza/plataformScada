import React from 'react';

import { ProjectTreeContextProvider } from '../../contexts/projectTreeContext';

import { Container } from './styles';

import Header from '../../components/header';
import ProjectTree from '../../components/ProjectTree';
import Editor from '../../components/Editor';

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <ProjectTreeContextProvider>
          <ProjectTree />
          <Editor />
        </ProjectTreeContextProvider>
      </Container>
    </>

  );
}

export default Main;