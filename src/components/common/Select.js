import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid var(--color-background-lighter);
  font-size: var(--font-size-xs);
  cursor: pointer;
  line-height: 1.1;
  background-color: var(--color-background-lighter);

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 2px;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%) rotate(-35deg);
    background: var(--color-text);
  }

  &::after {
    content: '';
    display: block;
    width: 8px;
    height: 2px;
    position: absolute;
    top: 50%;
    right: 26px;
    transform: translateY(-50%) rotate(35deg);
    background: var(--color-text);
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: default;

      &::before,
      &::after {
        display: none;
      }
    `}
`;

const StyledSelect = styled.select`
  appearance: none;
  border: 1px solid var(--color-background-lighter);
  background-color: var(--color-background-lighter);
  padding: 20px;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  color: var(--color-text);

  &::-ms-expand {
    display: none;
  }

  &:focus {
    border-bottom: 1px solid var(--color-primary);
  }
`;

const Select = ({ name, defaultOption, options, onChange, disabled }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <StyledWrapper isDisabled={disabled}>
      <StyledSelect
        name={name}
        id={name}
        value={selectedOption}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </StyledSelect>
    </StyledWrapper>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  defaultOption: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
};

export default Select;
