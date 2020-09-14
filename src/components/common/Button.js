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
  background: ${({ theme }) => theme.gradient};
  color: ${({ theme }) => theme.fontColor.light};
  border: none;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-decoration: none;
  padding: 20px 60px;
  cursor: pointer;
  outline: none;

  &:hover {
    background: ${({ theme }) => theme.darkGray};
  }

  ${({ primary }) =>
    primary &&
    css`
      background: ${({ theme }) => theme.darkGray};
      &:hover {
        background: ${({ theme }) => theme.gradient};
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
      color: ${({ theme }) => theme.fontColor.dark};
      padding: 0 15px;

      &:hover {
        background: ${({ theme }) => theme.gradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `}
`;

export default Button;
