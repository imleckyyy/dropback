import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const StyledRangeItem = styled.button`
  display: inline-block;
  position: relative;
  margin-right: 10px;
  height: 20px;
  width: ${({ maxValue }) => `${100 / maxValue}%`};
  text-align: left;
  background: var(--color-background-lighter);
  border: none;
  outline: none;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    right: -10px;
    top: 0;
    display: block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid var(--color-background-lighter);
    border-bottom: 10px solid transparent;
    z-index: 2;
  }

  &:after {
    content: '';
    position: absolute;
    right: -20px;
    top: 0;
    display: block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid var(--color-background);
    border-bottom: 10px solid transparent;
    z-index: 1;
  }

  &:hover {
    background: var(--color-primary);

    &:before {
      border-left: 10px solid var(--color-primary);
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: var(--color-gradient);

      &:before {
        border-left: 10px solid var(--color-gradient-end);
      }
    `}
`;

const StyledTextRange = styled.p`
  font-size: var(--font-size-s);
  min-width: 75px;
  text-align: right;
`;

const RangeStepper = ({ value, maxValue, onChange, readOnly }) => {
  const [rangeValue, setRangeValue] = useState(value);

  useEffect(() => {
    setRangeValue(value);
  }, [value]);

  const handleChange = (val) => {
    if (!readOnly) {
      setRangeValue(val);
      onChange(val);
    }
  };

  const items = [];
  for (let index = 0; index < maxValue; index += 1) {
    const currentIndex = index + 1;
    items.push(
      <StyledRangeItem
        type="button"
        onClick={() => handleChange(currentIndex)}
        key={currentIndex}
        isActive={currentIndex <= rangeValue}
        maxValue={maxValue}
      />,
    );
  }

  return (
    <StyledWrapper>
      <StyledRangeWrapper>{items}</StyledRangeWrapper>
      <StyledTextRange>
        {rangeValue} / {maxValue}
      </StyledTextRange>
    </StyledWrapper>
  );
};

RangeStepper.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

RangeStepper.defaultProps = {
  readOnly: false,
};

export default RangeStepper;
