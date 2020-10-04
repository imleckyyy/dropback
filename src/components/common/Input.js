import styled from 'styled-components';

const StyledInput = styled.input`
  border: 1px solid var(--color-background-lighter);
  background: var(--color-background);
  padding: 25px 20px 15px;
  color: var(--color-text);
  outline: none;

  &::placeholder {
    color: transparent;
  }

  &:focus {
    border-bottom: 1px solid var(--color-primary);
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    transform: translateY(-110%) translateX(-10%) scale(0.8);
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 50px var(--color-background) inset;
    box-shadow: 0 0 0 50px var(--color-background) inset;
    -webkit-text-fill-color: var(--color-text);
  }

  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 50px var(--color-background) inset;
    box-shadow: 0 0 0 50px var(--color-background) inset;
    -webkit-text-fill-color: var(--color-text);
  }
`;

export default StyledInput;
