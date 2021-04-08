import React from 'react';

import { ProjectTreeContextProvider, EditorContextProvider } from '../../contexts';

import { Container } from './styles';

import Header from '../../components/header';
import ProjectTree from '../../components/ProjectTree';
import Editor from '../../components/Editor';

const Main: React.FC = () => {
  return (
    <EditorContextProvider>
      <Header />
      <Container>
        <ProjectTreeContextProvider>
          <ProjectTree />
          <Editor />
        </ProjectTreeContextProvider>
      </Container>
    </EditorContextProvider>
  );
}

export default Main;