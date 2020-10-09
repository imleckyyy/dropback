import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import LogoImage from 'assets/logo_hor.png';
import LogoSplash from 'assets/logo_splash.png';
import DotsImage from 'assets/dots.png';

const StyledLogoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 85px;
  background: var(--color-gradient);

  @media (min-width: 740px) {
    width: 85px;
    height: 85px;
  }

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 5px;
    display: block;
    width: 75px;
    height: 75px;
    background: url(${() => DotsImage});
    background-size: 95%;
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
    z-index: -1;
  }
`;

const StyledLogoImage = styled.img`
  position: absolute;
  top: 0px;
  left: 8px;
  z-index: 1;
  width: 143px;
  height: 71px;
`;

const Logo = () => (
  <StyledLogoWrapper as={Link} to="/">
    <StyledLogoImage src={LogoImage} alt="FUT DropBack" />
  </StyledLogoWrapper>
);

export default Logo;
