import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.ul`
  display: flex;
  width: calc(100% - 45px);
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const StyledTag = styled.li`
  display: inline-block;
  position: relative;
  padding: 4px 15px 3px 20px;
  margin-right: 10px;
  text-align: left;
  background: var(--color-background);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    display: block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }

  &:before {
    right: -10px;
    border-left: 10px solid var(--color-background);
    z-index: 2;
  }

  &:after {
    right: -19px;
    border-left: 10px solid var(--color-background-lighter);
    z-index: 1;
  }

  &:first-of-type {
    background: var(--color-gradient);

    &:before {
      border-left: 10px solid var(--color-gradient-end);
    }
  }
`;

const getTagsArray = (tags, limit) =>
  tags
    .split(',')
    .map((item) => item.trim())
    .splice(0, limit);

const TagsList = ({ tags, limit }) => {
  if (!tags) return null;

  const tagsArray = getTagsArray(tags, limit);

  return (
    <StyledWrapper>
      {tagsArray && tagsArray.length
        ? tagsArray.map((tag) => <StyledTag key={tag}>{tag}</StyledTag>)
        : null}
    </StyledWrapper>
  );
};

TagsList.propTypes = {
  tags: PropTypes.string.isRequired,
  limit: PropTypes.number,
};

TagsList.defaultProps = {
  limit: 32,
};

export default TagsList;
