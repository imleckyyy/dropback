import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useOutsideClick from 'hooks/useOutsideClick';

import Heading from 'components/common/Heading';
import Paragraph from 'components/common/Paragraph';
import Button from 'components/common/Button';

import { AuthContext } from 'context/AuthContext';

const StyledWrapper = styled.div`
  position: relative;
  display: block;
  width: 80%;
  max-width: 500px;
  height: 100vh;
  position: fixed;
  right: 0%;
  top: 0%;
  background: ${({ theme }) => theme.lightGray};
  color: ${({ theme }) => theme.fontColor.dark};
  z-index: 4;
  padding: 100px 30px;
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '110%')});
  transition: transform 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);

  &:before {
    content: '';
    display: block;
    width: 10px;
    height: 100%;
    position: absolute;
    left: -10px;
    top: 0;
    background: linear-gradient(0deg, rgba(107, 106, 236, 1) 0%, rgba(187, 34, 250, 1) 100%);
  }
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const StyledCloseButton = styled(Button)`
  display: block;
  width: 40px;
  height: 40px;
  padding: 0;
  position: absolute;
  left: -25px;
  top: 50%;
  background: transparent;
  transform: ${({ isVisible }) =>
    isVisible ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0)'};
  transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.5s;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradient};
    transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  &:hover {
    background: transparent;

    &:before {
      transform: scale(1.4);
    }
  }
`;

const StyledCloseButtonInner = styled.span`
  display: block;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &:before,
  &:after {
    content: '';
    display: inline-block;
    width: 60%;
    height: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 50% 50%;
    background: #ffffff;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const UserSidebar = ({ isVisible, setSidebarVisibility }) => {
  const authContext = useContext(AuthContext);
  const { authState, logout } = authContext;

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (isVisible) {
      setSidebarVisibility(false);
    }
  });

  const logoutFn = () => {
    logout();
    setSidebarVisibility(false);
  };

  const closeSidebar = () => setSidebarVisibility(false);

  return (
    <StyledWrapper isVisible={isVisible} ref={ref}>
      <StyledHeader>
        <Paragraph>Welcome</Paragraph>
        <Heading>{authState.userInfo.login}</Heading>
      </StyledHeader>

      <Button type="button" onClick={logoutFn}>
        Logout
      </Button>
      <StyledCloseButton type="button" onClick={closeSidebar} isVisible={isVisible}>
        <StyledCloseButtonInner />
      </StyledCloseButton>
    </StyledWrapper>
  );
};

UserSidebar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setSidebarVisibility: PropTypes.func.isRequired,
};

export default UserSidebar;
