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
  background: ${({ theme }) => theme.darkGray};
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
    border-left: 10px solid ${({ theme }) => theme.darkGray};
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
    border-left: 10px solid #ffffff;
    border-bottom: 10px solid transparent;
    z-index: 1;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${({ theme }) => theme.gradient};

      &:hover {
        background: ${({ theme }) => theme.gradient};
      }

      &:before {
        border-left: 10px solid rgba(187, 34, 250, 1);
      }
    `}
`;

const StyledTextRange = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
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
        {rangeValue}/{maxValue}
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
