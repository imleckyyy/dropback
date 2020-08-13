import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import LogoImage from 'assets/logo.png';
import LogoSplash from 'assets/logo_splash.png';
import DotsImage from 'assets/dots.png';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 80px 20px 20px;
`;

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
  z-index: 1;
`;

const Header = () => (
  <StyledWrapper>
    <StyledLogoWrapper as={Link} to="/">
      <StyledLogoImage src={LogoImage} alt="FUT DropBack" />
    </StyledLogoWrapper>
    <div>
      Welcome <b>AirJapes</b>
    </div>
  </StyledWrapper>
);

export default Header;
