import { createGlobalStyle } from 'styled-components';
import bgImage1 from 'assets/bg_01.png';
import bgImage2 from 'assets/bg_02.png';

const GlobalStyles = createGlobalStyle`
    *, *:before, *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-size: 62.5%; 
        height: 100%;
    }
    
    body {
        height: 100%;
        font-size: 1.6rem;
        font-family: 'Montserrat', sans-serif;
        padding: 0;
        margin: 0;
        background-image: url(${() => bgImage1}), url(${() => bgImage2});
        background-attachment: fixed, fixed;
        background-position: 20% 20%, right bottom;
        background-repeat: no-repeat, no-repeat;
    }
`;

export default GlobalStyles;
