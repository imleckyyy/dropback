import React, { useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import useOutsideClick from 'hooks/useOutsideClick';

import { AuthContext } from 'context/AuthContext';
import { FetchContext } from 'context/FetchContext';

import Heading from 'components/common/Heading';
import Paragraph from 'components/common/Paragraph';
import Anchor from 'components/common/Anchor';
import Button from 'components/common/Button';
import Notyfication from 'components/common/Notyfication';

const StyledWrapper = styled.div`
  position: fixed;
  top: 40px;
  right: 30px;
`;

const StyledAuthLinkWrapper = styled.div`
  display: block;
  padding: 15px 40px;
  border: 1px solid var(--color-background-lighter);
`;

const StyledSidebarWrapper = styled.div`
  position: relative;
  display: block;
  width: 80%;
  max-width: 500px;
  height: 100vh;
  position: fixed;
  right: 0%;
  top: 0%;
  background: var(--color-background-lighter);
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
    background: var(--color-gradient);
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

const UserSidebar = () => {
  const { apiAxios } = useContext(FetchContext);
  const authContext = useContext(AuthContext);
  const { authState, isAuthenticated, logout } = authContext;

  const [isVisible, setIsVisible] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState(null);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (isVisible) {
      setIsVisible(false);
    }
  });

  const onLogout = async () => {
    try {
      await apiAxios.post('auth/logout');
      setLogoutLoading(true);
      setIsVisible(false);
      setTimeout(() => {
        logout();
      }, 700);
    } catch (error) {
      setLogoutLoading(false);
      const { data } = error.response;
      setLogoutError(data.message);
    }
  };
  return (
    <StyledWrapper>
      <StyledAuthLinkWrapper>
        {isAuthenticated() && authState.userInfo.login ? (
          <Button type="button" text onClick={() => setIsVisible(true)}>
            {authState.userInfo.login}
          </Button>
        ) : (
          <Anchor as={Link} to="/signin">
            Sign in
          </Anchor>
        )}
      </StyledAuthLinkWrapper>
      <>
        {isAuthenticated() && authState.userInfo.login ? (
          <StyledSidebarWrapper isVisible={isVisible} ref={ref}>
            <StyledHeader>
              <Paragraph>Welcome</Paragraph>
              <Heading>{authState.userInfo.login}</Heading>
            </StyledHeader>
            {logoutError && (
              <Notyfication onClose={() => setLogoutError(null)} error>
                {logoutError}
              </Notyfication>
            )}
            <Button
              type="button"
              onClick={onLogout}
              isLoading={logoutLoading}
              disabled={logoutLoading}
            >
              Logout
            </Button>
            <StyledCloseButton
              type="button"
              onClick={() => setIsVisible(false)}
              isVisible={isVisible}
            >
              <StyledCloseButtonInner />
            </StyledCloseButton>
          </StyledSidebarWrapper>
        ) : null}
      </>
    </StyledWrapper>
  );
};

export default UserSidebar;
