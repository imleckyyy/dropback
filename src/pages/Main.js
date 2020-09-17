import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Heading from 'components/common/Heading';
import Button from 'components/common/Button';
import SearchBar from 'components/SearchBar';

import formationTypes from 'constants/formationTypes';
import selectedUsers from 'constants/selectedUsers';

const StyledColorfulHeading = styled(Heading)`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 50px;
`;

const StyledTextSeparator = styled.p`
  display: block;
  text-align: center;
  text-transform: uppercase;
  padding: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StyledSeparator = styled.div`
  display: block;
  width: 100%;
  height: 5px;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 0, 0, 1) 6%,
    rgba(8, 151, 190, 1) 6%,
    rgba(7, 162, 202, 1) 23%,
    rgba(0, 0, 0, 1) 23%,
    rgba(0, 0, 0, 1) 31%,
    rgba(0, 0, 0, 1) 41%,
    rgba(255, 13, 156, 1) 41%,
    rgba(207, 32, 167, 1) 57%,
    rgba(0, 0, 0, 1) 57%,
    rgba(0, 0, 0, 1) 80%,
    rgba(4, 146, 187, 1) 80%,
    rgba(0, 212, 255, 1) 100%
  );
  margin: 30px 0;
`;

const StyledFiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const StyledFormationLink = styled(Button)`
  min-width: 8.33333%;
  margin: 0 5px 5px 0;
  white-space: nowrap;
  padding: 10px 15px;
  text-align: center;
`;

const Main = () => (
  <>
    <StyledColorfulHeading>
      Your no 1 website for FIFA tactics
      <br />
      from content creators and YOU
    </StyledColorfulHeading>

    <SearchBar />

    <StyledTextSeparator>or</StyledTextSeparator>

    <StyledFiltersWrapper>
      {formationTypes.map(({ id, name }) => (
        <StyledFormationLink as={Link} to={`/query?formationId=${id}`} key={id} primary="true">
          {name}
        </StyledFormationLink>
      ))}
    </StyledFiltersWrapper>

    <StyledSeparator />

    <StyledFiltersWrapper>
      {selectedUsers.map(({ name, href }) => (
        <StyledFormationLink as={Link} to={`/users${href}`} key={href}>
          {name}
        </StyledFormationLink>
      ))}
    </StyledFiltersWrapper>
  </>
);

export default Main;
