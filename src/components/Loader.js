import React from 'react';
import styled, { keyframes } from 'styled-components';

const StyledLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
`;

const loaderAnim = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const StyledLoader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    border: 4px solid var(--color-primary);
    opacity: 1;
    border-radius: 50%;
    animation: ${loaderAnim} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

const Loader = () => (
  <StyledLoaderWrapper>
    <StyledLoader>
      <div />
      <div />
    </StyledLoader>
  </StyledLoaderWrapper>
);

export default Loader;
