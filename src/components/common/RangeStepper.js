import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
`;

const StyledRangeItem = styled.button`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      background: red;
    `}
`;

const RangeStepper = ({ rate, maxRate }) => {
  const [rating, setRating] = useState(rate);

  useEffect(() => {
    setRating(rate);
  }, [rate]);

  const items = [];
  for (let index = 0; index < maxRate; index += 1) {
    const ratingIndex = index + 1;
    items.push(
      <StyledRangeItem
        type="button"
        onClick={() => setRating(ratingIndex)}
        key={ratingIndex}
        isActive={ratingIndex <= rating}
      />,
    );
  }

  return (
    <StyledWrapper>
      {items}
      <p>
        {rating}/{maxRate}
      </p>
    </StyledWrapper>
  );
};

RangeStepper.propTypes = {
  rate: PropTypes.number.isRequired,
  maxRate: PropTypes.number.isRequired,
};

export default RangeStepper;
