import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid ${({ theme }) => theme.darkGray};
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: ${({ theme }) => theme.darkGray};

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 2px;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%) rotate(-35deg);
    background: ${({ theme }) => theme.fontColor.light};
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
    background: ${({ theme }) => theme.fontColor.light};
  }

  &--disabled {
    cursor: not-allowed;
    background-color: #eee;
    background-image: linear-gradient(to top, #ddd, #eee 33%);
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  background-color: ${({ theme }) => theme.darkGray};
  border: none;
  padding: 20px;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  color: ${({ theme }) => theme.fontColor.light};

  &::-ms-expand {
    display: none;
  }

  &:focus + .focus {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid red;
    border-radius: inherit;
  }
`;

const Select = ({ name, defaultOption, options, onChange }) => {
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
    <StyledWrapper>
      <StyledSelect name={name} id={name} value={selectedOption} onChange={handleChange}>
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
};

export default Select;
