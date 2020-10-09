import styled, { css, keyframes } from 'styled-components';

const rotateCenterKeyframes = keyframes`
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
`;

const Button = styled.button`
  position: relative;
  padding: 20px 60px;
  cursor: pointer;
  outline: none;
  border: none;
  background: var(--color-button-background);
  color: var(--color-button-text);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;

  &:hover {
    background: var(--color-button-background-hover);
    color: var(--color-button-text-hover);
  }

  ${({ primary }) =>
    primary &&
    css`
      background: var(--color-button-background-hover);
      color: var(--color-button-text-hover);
      &:hover {
        background: var(--color-button-background);
        color: var(--color-button-text);
      }
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      &:before {
        content: '';
        display: block;
        width: 15px;
        height: 15px;
        border: 2px solid #ffffff;
        border-left: 2px solid transparent;
        border-radius: 50%;
        position: absolute;
        left: 20px;
        top: 20px;
        animation: ${rotateCenterKeyframes} 2s ease-in-out infinite both;
      }
    `}

  ${({ text }) =>
    text &&
    css`
      background: none;
      color: var(--color-text-reverse);
      padding: 0 15px;

      &:hover {
        background: var(--color-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `}
`;

export default Button;
