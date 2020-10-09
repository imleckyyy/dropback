import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from 'components/common/Input';
import Notyfication from 'components/Notyfication';

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledLabel = styled.label`
  position: absolute;
  left: 20px;
  top: 20px;
  font-size: var(--font-size-xs);
  color: var(--color-text);
  transform: scale(1);
  transition: transform 300ms ease, opacity 300ms ease;
  opacity: 0.5;
  cursor: text;
`;

const FormField = ({ label, name, errors, ...props }) => (
  <StyledWrapper>
    <Input id={name} name={name} {...props} />
    <StyledLabel htmlFor={name}>{label}</StyledLabel>
    {errors && <Notyfication error>{errors}</Notyfication>}
  </StyledWrapper>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.string,
};

FormField.defaultProps = {
  errors: null,
};

export default FormField;
