import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Sidebar from 'components/Sidebar';
import UserSidebar from 'components/UserSidebar';

const StyledChildrenWrapper = styled.div`
  padding: 160px 70px 70px 190px;
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
