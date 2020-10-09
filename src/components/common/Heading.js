import styled from 'styled-components';

const Heading = styled.p`
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);

  &:first-letter {
    text-transform: uppercase;
  }
`;

export default Heading;
