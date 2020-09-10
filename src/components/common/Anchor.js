import styled from 'styled-components';

const Anchor = styled.a`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.fontColor.dark};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export default Anchor;
