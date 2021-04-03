import React from 'react';
import { ThemeProvider } from 'styled-components';
import Main from './pages/Main';

import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';



const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Main />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;