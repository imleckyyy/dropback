import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import LogoImage from 'assets/logo.png';
import LogoSplash from 'assets/logo_splash.png';
import DotsImage from 'assets/dots.png';

const StyledLogoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 345px;
  height: 100px;
  background: ${({ theme }) => theme.gradient};

  &:before {
    content: '';
    position: absolute;
    left: -10px;
    bottom: -10px;
    display: block;
    width: 102px;
    height: 102px;
    background: url(${() => DotsImage});
    background-size: 95%;
    transition: transform ease-in-out 400ms;
  }

  &:after {
    content: '';
    position: absolute;
    top: -10px;
    right: -10px;
    display: block;
    width: 92px;
    height: 90px;
    background: url(${() => LogoSplash});
    transition: transform ease-in-out 300ms;
  }

  &:hover {
    &:before {
      transform: translate(-5px, -5px);
    }

    &:after {
      transform: translate(5px, 5px);
    }
  }
`;

const StyledLogoImage = styled.img`
  position: relative;
  top: -10px;
  z-index: 1;
`;

const Logo = () => (
  <StyledLogoWrapper as={Link} to="/">
    <StyledLogoImage src={LogoImage} alt="FUT DropBack" />
  </StyledLogoWrapper>
);

export default Logo;
