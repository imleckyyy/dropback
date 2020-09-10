import styled from 'styled-components';

const Heading = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default Heading;
