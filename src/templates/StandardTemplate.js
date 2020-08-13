import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';

const StyledChildrenWrapper = styled.div`
  padding: 140px 70px 70px 190px;
`;

function StandardTemplate({ children }) {
  return (
    <>
      <Header />
      <Sidebar />
      <StyledChildrenWrapper>{children}</StyledChildrenWrapper>
    </>
  );
}

StandardTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StandardTemplate;
