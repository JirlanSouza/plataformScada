import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, #root {
    height: 100vh;
    width: 100vw;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   -webkit-touch-callout: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
  }

    ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.pallete.surface};
    }
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background: ${(props) => props.theme.pallete.surface};
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.pallete.onPrimary};
    }

    ::-webkit-scrollbar-corner {
      background: ${(props) => props.theme.pallete.surface};
    }

`;

export default GlobalStyle;
