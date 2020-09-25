import React from 'react';
import PropTypes from 'prop-types';
import { getFormationName } from 'utils';
import TagsList from 'components/TagsList';

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
    <>
      <TagsList tags={tags} />
      <p>Formation: {getFormationName(formationId)}</p>
      <p>Creator: {userName}</p>
      <p>Tags:</p>
      {description && <p>Description: {description}</p>}
      {redditUrl && <p>Reddit Url: {redditUrl}</p>}
      {squadUrl && <p>Squad Url: {squadUrl}</p>}
      {guideUrl && <p>Guide Url: {guideUrl}</p>}
    </>
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
