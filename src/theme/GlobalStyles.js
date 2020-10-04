import { createGlobalStyle } from 'styled-components';
import bgImage1 from 'assets/bg_01.png';
import bgImage2 from 'assets/bg_02.png';

const GlobalStyles = createGlobalStyle`
    *, *:before, *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :root {
        --font-weight-light: 300;
        --font-weight-regular: 400;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --font-size-xxs: 1rem;
        --font-size-xs: 1.2rem;
        --font-size-s: 1.6rem;
        --font-size-m: 2.1rem;
        --font-size-l: 2.4rem;
        --font-size-xl: 3.7rem;
        --font-family: 'Montserrat', sans-serif;
    }

    html {
        --color-text: hsl(0deg, 0%, 100%);
        --color-text-reverse: rgb(0deg, 0%, 0%);
        --color-background: hsl(0deg, 0%, 7%);
        --color-background-lighter: hsl(0deg, 0%, 11%);
        --color-gradient-start: hsl(240deg, 79%, 67%);
        --color-gradient-end: hsl(282deg, 95%, 56%);
        --color-gradient: linear-gradient(90deg, var(--color-gradient-start) 0%, var(--color-gradient-end) 100%);
        --color-primary: hsl(234deg, 73%, 66%);
        --color-info: hsl(211deg, 100%, 26%);
        --color-info-background: hsl(211deg, 100%, 90%);
        --color-info-border: hsl(211deg, 100%, 86%);
        --color-success: hsl(134deg, 61%, 21%);
        --color-success-background: hsl(134deg, 42%, 88%);
        --color-success-border: hsl(134deg, 40%, 83%);
        --color-error: hsl(355deg, 60%, 28%);
        --color-error-background: hsl(355deg, 68%, 91%);
        --color-error-border: hsl(355deg, 70%, 87%);
        --color-gray-100: hsl(225deg, 25%, 95%);
        --color-gray-200: hsl(225deg, 16%, 90%);
        --color-gray-300: hsl(225deg, 8%, 80%);
        --color-gray-400: hsl(225deg, 8%, 70%);
        --color-gray-500: hsl(225deg, 7%, 60%);
        --color-gray-600: hsl(225deg, 15%, 50%);
        --color-gray-700: hsl(225deg, 12%, 40%);
        --color-gray-900: hsl(225deg, 25%, 20%);
        --color-gray-1000: hsl(225deg, 15%, 15%);

        font-size: 62.5%;
        height: 100%;
    }
    
    body {
        height: 100%;
        font-size: 1.6rem;
        font-family: var(--font-family);
        color: var(--color-text);
        padding: 0;
        margin: 0;
        background-color: var(--color-background);
        /* background-image: url(${() => bgImage1}), url(${() => bgImage2}); */
        background-attachment: fixed, fixed;
        background-position: 20% 20%, right bottom;
        background-repeat: no-repeat, no-repeat;
    }

    body, input, button, select, option {
        font-family: var(--font-family);
    }
`;

export default GlobalStyles;
