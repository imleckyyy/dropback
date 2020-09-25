import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.ul`
  position: relative;
  display: flex;
  width: calc(100% - 45px);
  overflow: hidden;
  margin: 0;
  padding: 0;

  &:after {
    content: '';
    display: block;
    width: 20px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    background: ${({ theme }) =>
      `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${theme.lightGray} 100%);`};
  }
`;

const StyledTag = styled.li`
  display: inline-block;
  position: relative;
  padding: 4px 15px 3px 20px;
  margin-right: 10px;
  text-align: left;
  background: ${({ theme }) => theme.darkGray};
  color: ${({ theme }) => theme.fontColor.light};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;

  &:before {
    content: '';
    position: absolute;
    right: -10px;
    top: 0;
    display: block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid ${({ theme }) => theme.darkGray};
    border-bottom: 10px solid transparent;
    z-index: 2;
  }

  &:after {
    content: '';
    position: absolute;
    right: -19px;
    top: 0;
    display: block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid #ffffff;
    border-bottom: 10px solid transparent;
    z-index: 1;
  }

  &:first-of-type {
    background: ${({ theme }) => theme.gradient};

    &:before {
      border-left: 10px solid rgba(187, 34, 250, 1);
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
