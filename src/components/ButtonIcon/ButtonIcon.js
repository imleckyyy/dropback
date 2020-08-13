import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 60px;
  height: 60px;
  background: url(${({ iconUrl }) => iconUrl});
  background-position: center center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

export default ButtonIcon;
