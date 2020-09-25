import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  opacity: 0.5;

  svg {
    width: 45%;
    height: 45%;
    fill: ${({ theme }) => theme.lightGray};
  }

  &:hover {
    opacity: 1;
  }
`;

export default ButtonIcon;
