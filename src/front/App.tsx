import { ipcRenderer } from 'electron';
import React, { useState } from 'react';

import { ThemeProvider } from 'styled-components';
import { AppContextProvider } from './contexts';
import Main from './pages/Main';

import GlobalStyle from './styles/globalStyles';
import { themes } from './styles/theme';

const App: React.FC = () => {
  const [theme, setTheme] = useState(themes.lightTheme);

  ipcRenderer.on('setTheme', (event, themeName: string) => {
    setTheme(themes[themeName]);
  });

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
