import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppContextProvider } from './contexts';
import Main from './pages/Main';

import GlobalStyle from './styles/globalStyles';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Main />
      </AppContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
