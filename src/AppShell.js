import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import UserSidebar from 'components/UserSidebar';

const StyledChildrenWrapper = styled.div`
  padding: 160px 70px 70px 190px;
`;

function AppShell({ children }) {
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

  const setSidebarVisibility = (state) => setIsUserSidebarOpen(state);

  return (
    <>
      <Header setSidebarVisibility={setSidebarVisibility} />
      <Sidebar />
      <StyledChildrenWrapper>{children}</StyledChildrenWrapper>
      <UserSidebar isVisible={isUserSidebarOpen} setSidebarVisibility={setSidebarVisibility} />
    </>
  );
}

AppShell.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppShell;
