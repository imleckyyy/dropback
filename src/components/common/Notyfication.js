import styled, { css } from 'styled-components';

const Notyfication = styled.p`
  display: block;
  padding: 15px;
  text-align: center;
  color: #004085;
  background-color: #cce5ff;
  border: 1px solid #b8daff;
  font-size: ${({ theme }) => theme.fontSize.xs};

  ${({ success }) =>
    success &&
    css`
      color: #155724;
      background-color: #d4edda;
      border-color: #c3e6cb;
    `}

  ${({ error }) =>
    error &&
    css`
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    `}
`;

export default Notyfication;
