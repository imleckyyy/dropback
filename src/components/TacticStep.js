import React, { useContext } from 'react';
import styled from 'styled-components';
import Heading from 'components/common/Heading';
import Select from 'components/common/Select';
import RangeStepper from 'components/common/RangeStepper';

import { CreatorContext } from 'context/CreatorContext';

import defensiveStyles from 'constants/defensiveStyles';
import offensiveStyles from 'constants/offensiveStyles';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  min-width: 300px;
`;

const selectDefensiveStylesOptions = defensiveStyles.map((item) => ({
  value: item.id,
  label: item.name,
}));

const selectOffensiveStylesOptions = offensiveStyles.map((item) => ({
  value: item.id,
  label: item.name,
}));

const TacticStep = () => {
  const { tactic, changeTacticSetting } = useContext(CreatorContext);
  const {
    defenseStyle,
    defenseWidth,
    defenseDepth,
    offenseStyle,
    offenseWidth,
    offensePlayersInBox,
    corners,
    freeKicks,
  } = tactic;

  return (
    <StyledWrapper>
      <Heading>Defense</Heading>
      <StyledRow>
        <StyledLabel htmlFor="defensiveStyle">Defensive Style:</StyledLabel>
        <Select
          name="defensiveStyle"
          defaultOption={defenseStyle}
          options={selectDefensiveStylesOptions}
          onChange={(id) => changeTacticSetting('defenseStyle', id)}
        />
      </StyledRow>
      <StyledRow>
        <StyledLabel htmlFor="defenseWidth">Width:</StyledLabel>
        <RangeStepper
          value={defenseWidth}
          maxValue={10}
          onChange={(value) => changeTacticSetting('defenseWidth', value)}
        />
      </StyledRow>
      <StyledRow>
        <StyledLabel htmlFor="defenseDepth">Depth:</StyledLabel>
        <RangeStepper
          value={defenseDepth}
          maxValue={10}
          onChange={(value) => changeTacticSetting('defenseDepth', value)}
        />
      </StyledRow>

      <Heading>Offense</Heading>
      <StyledRow>
        <StyledLabel htmlFor="defensiveStyle">Offensive Style:</StyledLabel>
        <Select
          name="offensiveStyle"
          defaultOption={offenseStyle}
          options={selectOffensiveStylesOptions}
          onChange={(id) => changeTacticSetting('offenseStyle', id)}
        />
      </StyledRow>
      <StyledRow>
        <StyledLabel htmlFor="offenseWidth">Width:</StyledLabel>
        <RangeStepper
          value={offenseWidth}
          maxValue={10}
          onChange={(value) => changeTacticSetting('offenseWidth', value)}
        />
      </StyledRow>
      <StyledRow>
        <StyledLabel htmlFor="offensePlayersInBox">Players In Box:</StyledLabel>
        <RangeStepper
          value={offensePlayersInBox}
          maxValue={10}
          onChange={(value) => changeTacticSetting('offensePlayersInBox', value)}
        />
      </StyledRow>
      <StyledRow>
        <StyledLabel htmlFor="corners">Corners:</StyledLabel>
        <RangeStepper
          value={corners}
          maxValue={5}
          onChange={(value) => changeTacticSetting('corners', value)}
        />
      </StyledRow>
      <StyledRow>
        <StyledLabel htmlFor="freeKicks">Free Kicks:</StyledLabel>
        <RangeStepper
          value={freeKicks}
          maxValue={5}
          onChange={(value) => changeTacticSetting('freeKicks', value)}
        />
      </StyledRow>
    </StyledWrapper>
  );
};

export default TacticStep;
