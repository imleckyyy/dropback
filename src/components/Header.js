import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';

import Logo from 'components/common/Logo';
import Anchor from 'components/common/Anchor';
import Button from 'components/common/Button';

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

const Header = ({ setSidebarVisibility }) => {
  const authContext = useContext(AuthContext);
  const { authState, isAuthenticated } = authContext;

  return (
    <StyledWrapper>
      <Logo />
      <div>
        {isAuthenticated && authState.userInfo.login ? (
          <Button type="button" text onClick={() => setSidebarVisibility(true)}>
            {authState.userInfo.login}
          </Button>
        ) : (
          <Anchor as={Link} to="/signin">
            Sign in
          </Anchor>
        )}
      </div>
    </StyledWrapper>
  );
};

Header.propTypes = {
  setSidebarVisibility: PropTypes.func.isRequired,
};

export default Header;
