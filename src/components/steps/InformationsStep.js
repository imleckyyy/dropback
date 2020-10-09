import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getFormationName } from 'utils/tactic';
import TagsList from 'components/TagsList';
import Pitch from 'components/Pitch';

const StyledWrapper = styled.div`
  display: flex;
`;

const StyledBox = styled.div`
  flex: 1;
  min-width: 40%;
`;

const StyledInformationsWrapper = styled.div`
  background: var(--color-background-lighter);
  padding: 15px;
`;

const InformationsStep = ({
  formationId,
  tags,
  description,
  redditUrl,
  squadUrl,
  guideUrl,
  userName,
  userId,
}) => {
  return (
    <StyledWrapper>
      <StyledBox>
        <StyledInformationsWrapper>
          <TagsList tags={tags} />
          <p>Formation: {getFormationName(formationId)}</p>
          <p>Creator: {userName}</p>
          {description && <p>Description: {description}</p>}
          {redditUrl && <p>Reddit Url: {redditUrl}</p>}
          {squadUrl && <p>Squad Url: {squadUrl}</p>}
          {guideUrl && <p>Guide Url: {guideUrl}</p>}
        </StyledInformationsWrapper>
      </StyledBox>
      <Pitch formationId={formationId} />
    </StyledWrapper>
  );
};

InformationsStep.propTypes = {
  formationId: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  description: PropTypes.string,
  redditUrl: PropTypes.string,
  squadUrl: PropTypes.string,
  guideUrl: PropTypes.string,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

InformationsStep.defaultProps = {
  description: null,
  redditUrl: null,
  squadUrl: null,
  guideUrl: 'asda',
};

export default InformationsStep;
