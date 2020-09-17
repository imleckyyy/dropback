import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { CreatorContext } from 'context/CreatorContext';

import Heading from 'components/common/Heading';
import Paragraph from 'components/common/Paragraph';
import Select from 'components/common/Select';
import Pitch from 'components/Pitch';

import positionsByFormation from 'constants/positionsByFormation';
import positionInstructions from 'constants/positionInstructions';

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledBox = styled.div`
  flex: 1;
  min-width: 40%;
`;

const InstructionsStep = () => {
  const creatorContext = useContext(CreatorContext);
  const { formationId } = creatorContext;

  const [positions, setPositions] = useState([]);
  const [activePosition, setActivePosition] = useState(0);
  const [activePositionName, setActivePositionName] = useState('GK');
  const [currentPositionInstructions, setCurrentPositionInstructions] = useState(null);
  // const [currentPlayerInstructions, setCurrentPlayerInstructions] = useState(instructions[0]);

  useEffect(() => {
    const formationPositions = positionsByFormation[formationId].map(({ id, positionName }) => ({
      value: id,
      label: positionName,
    }));
    setPositions(formationPositions);
  }, [formationId]);

  useEffect(() => {
    if (positions.length) {
      const { label: positionName } = positions.find((item) => item.value === activePosition);
      setActivePositionName(positionName);
    }
  }, [activePosition]);

  useEffect(() => {
    const playerInstructions = positionInstructions.filter((playerInstruction) =>
      playerInstruction.positions.includes(activePositionName),
    );
    setCurrentPositionInstructions(playerInstructions);
  }, [activePositionName]);

  return (
    <StyledWrapper>
      <StyledBox>
        <Heading>Select player position</Heading>
        <Select
          name="position"
          defaultOption={activePosition}
          options={positions}
          onChange={setActivePosition}
        />
        <Paragraph>Active player: {activePositionName}</Paragraph>

        {currentPositionInstructions ? (
          currentPositionInstructions.map((item) => item.name)
        ) : (
          <Paragraph>Select position</Paragraph>
        )}
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
