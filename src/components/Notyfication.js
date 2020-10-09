import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import Paragraph from 'components/common/Paragraph';
import ButtonIcon from 'components/common/ButtonIcon';

import { ReactComponent as CloseIcon } from 'assets/icons/cancel.svg';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  display: block;
  padding: 15px 50px 15px 15px;
  margin-bottom: 15px;
  text-align: left;
  color: var(--color-info);
  background-color: var(--color-info-background);
  border: 1px solid var(--color-info-border);
  animation: ${fadeIn} 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;

  ${({ success }) =>
    success &&
    css`
      color: var(--color-success);
      background-color: var(--color-success-background);
      border: 1px solid var(--color-success-border);
    `}

  ${({ error }) =>
    error &&
    css`
      color: var(--color-error);
      background-color: var(--color-error-background);
      border: 1px solid var(--color-error-border);
    `}
`;

const StyledParagraph = styled(Paragraph)`
  flex: 1;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
`;

const StyledButtonIcon = styled(ButtonIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  opacity: 1;

  &:hover {
    opacity: 0.5;
  }

  svg {
    fill: red;
    width: 80%;
    height: 80%;
  }
`;

const Notyfication = ({ children, onClose, error, success }) => (
  <StyledWrapper error={error} success={success}>
    <StyledParagraph>{children}</StyledParagraph>
    {onClose && (
      <StyledButtonIcon type="button" onClick={onClose}>
        <CloseIcon />
      </StyledButtonIcon>
    )}
  </StyledWrapper>
);

Notyfication.propTypes = {
  children: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

Notyfication.defaultProps = {
  onClose: null,
  error: false,
  success: false,
};

export default Notyfication;
