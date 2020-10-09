import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Anchor from 'components/common/Anchor';
import Paragraph from 'components/common/Paragraph';
import TagsList from 'components/TagsList';
import { getFormationName, getDefensiveStyleName, getOffensiveStyleName } from 'utils/tactic';
import { formatDmy, diffDays } from 'utils';

const StyledWrapper = styled.div`
  display: flex;
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
  padding-right: 5px;
  padding-left: 5px;
  margin-bottom: 10px;

  @media (min-width: 740px) {
    flex: 0 0 50%;
    max-width: 50%;
  }

  @media (min-width: 960px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }

  @media (min-width: 1200px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
`;

const StyledSubWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--color-background-lighter);
  overflow: hidden;
`;

const StyledTagsWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const StyledParagraph = styled(Paragraph)`
  font-size: var(--font-size-xs);
  text-align: center;
`;

const StyledFormationName = styled(Anchor)`
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-regular);
  margin-bottom: 15px;
`;

const StyledMetaInfoWrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const StyledNewLabel = styled.span`
  position: absolute;
  right: -50px;
  top: -30px;
  background: var(--color-gradient);
  padding: 50px 40px 5px;
  transform: rotate(45deg);
  font-size: var(--font-size-xxs);
  font-weight: var(--font-weight-semibold);
  z-index: 3;
`;

const TacticItem = ({ item }) => {
  const {
    _id: id,
    tags,
    formationId,
    userinfo: { login: userName },
    defenseStyle,
    offenseStyle,
    createdAt,
  } = item;

  const formationName = getFormationName(formationId);
  const defensiveStyleName = getDefensiveStyleName(defenseStyle);
  const offensiveStyleName = getOffensiveStyleName(offenseStyle);

  const isNew = diffDays(new Date(createdAt), new Date()) <= 5;

  return (
    <StyledWrapper>
      <StyledSubWrapper>
        {isNew && <StyledNewLabel>new</StyledNewLabel>}
        <StyledTagsWrapper>
          <TagsList tags={tags} limit={2} />
        </StyledTagsWrapper>
        <StyledFormationName as={Link} to={`/tactic/${id}`}>
          {formationName}
        </StyledFormationName>
        <StyledParagraph>Defensive style: {defensiveStyleName}</StyledParagraph>
        <StyledParagraph>Offensive style: {offensiveStyleName}</StyledParagraph>
        <StyledMetaInfoWrapper>
          <StyledParagraph>
            Created by{' '}
            <Anchor as={Link} to={`/users/${userName}`}>
              {userName}
            </Anchor>
          </StyledParagraph>
          <StyledParagraph>{formatDmy(new Date(createdAt))}</StyledParagraph>
        </StyledMetaInfoWrapper>
      </StyledSubWrapper>
    </StyledWrapper>
  );
};

TacticItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string,
    tags: PropTypes.string,
    formationId: PropTypes.number.isRequired,
    defenseStyle: PropTypes.number.isRequired,
    offenseStyle: PropTypes.number.isRequired,
    userinfo: PropTypes.shape({
      login: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TacticItem;
