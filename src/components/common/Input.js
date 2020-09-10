import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledLabel = styled.label`
  position: absolute;
  left: 20px;
  top: 20px;
  transform: scale(1);
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: #7d7e80;
  transition: transform 300ms ease;
  cursor: text;
`;

const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.lightGray};
  padding: 25px 20px 15px;
  color: ${({ theme }) => theme.fontColor.dark};
  font-family: 'Roboto', sans-serif;
  outline: none;
  resize: none;

  &::placeholder {
    color: transparent;
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    transform: translateY(-110%) translateX(-10%) scale(0.8);
  }
`;

const InputError = styled.p`
  position: relative;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: red;
  padding: 0;
  margin: 0 15px 10px;

  &:before {
    content: '\\00d7';
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const Input = ({ label, name, errors, ...props }) => (
  <StyledWrapper>
    <StyledInput id={name} name={name} {...props} />
    <StyledLabel htmlFor={name}>{label}</StyledLabel>
    {errors && <InputError>{errors}</InputError>}
  </StyledWrapper>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.string,
};

Input.defaultProps = {
  errors: null,
};

export default Input;
