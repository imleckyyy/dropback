import styled from 'styled-components';

const Anchor = styled.a`
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xs);
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    background: var(--color-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export default Anchor;
