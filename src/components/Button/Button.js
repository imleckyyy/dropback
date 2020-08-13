import styled from 'styled-components';

const Button = styled.button`
  background: ${({ theme }) => theme.gradient};
  color: ${({ theme }) => theme.fontColor.light};
  text-decoration: none;
  padding: 20px 30px;
`;

export default Button;
