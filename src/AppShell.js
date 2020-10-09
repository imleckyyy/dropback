import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Sidebar from 'components/Sidebar';
import UserSidebar from 'components/UserSidebar';

const StyledChildrenWrapper = styled.div`
  padding: 110px 20px 20px 70px;

  @media (min-width: 740px) {
    padding: 110px 70px 70px 170px;
  }

  @media (min-width: 960px) {
    padding: 110px 70px 70px 190px;
  }
`;

function AppShell({ children }) {
  return (
    <>
      <Sidebar />
      <StyledChildrenWrapper>{children}</StyledChildrenWrapper>
      <UserSidebar />
    </>
  );
}

AppShell.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppShell;
