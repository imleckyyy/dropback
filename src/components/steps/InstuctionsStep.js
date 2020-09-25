import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { TacticContext } from 'context/TacticContext';

import Heading from 'components/common/Heading';
import Select from 'components/common/Select';
import Pitch from 'components/Pitch';
import InstructionsContainer from 'components/InstructionsContainer';

import positionInstructions from 'constants/positionInstructions';

import DotsImage from 'assets/dots.png';

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledBox = styled.div`
  flex: 1;
  padding-right: 25px;
`;

const StyledHeading = styled(Heading)`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 10px;
    z-index: -1;
    display: block;
    width: 102px;
    height: 102px;
    background: url(${() => DotsImage});
    background-size: 95%;
    opacity: 0.5;
  }
`;

const InstructionsStep = () => {
  const tacticContext = useContext(TacticContext);
  const { formationId, positions, changePositionInstruction } = tacticContext;

  const [activePosition, setActivePosition] = useState(0);
  const [activePositionInstructions, setActivePositionInstructions] = useState([]);
  const [positionInstructionsSet, setPositionInstructionsSet] = useState([]);

  /* eslint-disable */
  useEffect(() => {
    const { positionName, instructions } = positions.find((item) => item.id === activePosition);

    const playerInstructions = positionInstructions.filter((playerInstruction) =>
      playerInstruction.positions.includes(positionName),
    );

    setActivePositionInstructions(instructions);
    setPositionInstructionsSet(playerInstructions);
  }, [activePosition]);

  useEffect(() => {
    changePositionInstruction(activePosition, activePositionInstructions);
  }, [activePositionInstructions]);
  /* eslint-enable */

  const changeFn = (id, value) => {
    const newInstructions = activePositionInstructions.map((item) => ({
      id: item.id,
      value: item.id === id ? value : item.value,
    }));

    setActivePositionInstructions(newInstructions);
  };

  const selectOptions = positions.map((item) => ({
    value: item.id,
    label: item.positionName,
  }));

  return (
    <StyledWrapper>
      <StyledBox>
        <StyledHeading>Active position</StyledHeading>
        <Select
          name="position"
          defaultOption={activePosition}
          options={selectOptions}
          onChange={setActivePosition}
        />
        <InstructionsContainer
          instructionsSet={positionInstructionsSet}
          instructionsValues={activePositionInstructions}
          changeFn={changeFn}
        />
      </StyledBox>
      <Pitch
        formationId={formationId}
        activePosition={activePosition}
        changeActivePosition={setActivePosition}
      />
    </StyledWrapper>
  );
};

export default InstructionsStep;
