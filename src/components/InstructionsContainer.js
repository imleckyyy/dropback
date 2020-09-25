import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InstructionsItem from 'components/InstructionsItem';

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px -10px;
`;

const InstructionsContainer = ({ instructionsSet, instructionsValues, changeFn }) => (
  <StyledWrapper>
    {instructionsSet.map((item) => {
      const { value } = instructionsValues.find((instr) => instr.id === item.id);
      return (
        <InstructionsItem
          key={item.name}
          id={item.id}
          name={item.name}
          value={value}
          settings={item.settings}
          onChange={changeFn}
        />
      );
    })}
  </StyledWrapper>
);

InstructionsContainer.propTypes = {
  instructionsSet: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      settings: PropTypes.arrayOf(PropTypes.object).isRequired,
      positions: PropTypes.arrayOf(PropTypes.string).isRequired,
      defaultId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  instructionsValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  changeFn: PropTypes.func.isRequired,
};

export default InstructionsContainer;
