import React from 'react';
import { ThemeProvider } from 'styled-components';

import Header from './components/header';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;