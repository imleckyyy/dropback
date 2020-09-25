import React, { useContext } from 'react';
import styled from 'styled-components';
import { TacticContext } from 'context/TacticContext';
import Heading from 'components/common/Heading';
import Select from 'components/common/Select';
import Pitch from 'components/Pitch';

import formationTypes from 'constants/formationTypes';

const StyledWrapper = styled.div`
  display: flex;
`;

const StyledBox = styled.div`
  flex: 1;
  min-width: 40%;
`;

const formationSelectOptions = formationTypes.map(({ id, name }) => ({
  value: id,
  label: name,
}));

const FormationStep = () => {
  const tacticContext = useContext(TacticContext);
  const { formationId, changeFormation } = tacticContext;

  return (
    <StyledWrapper>
      <StyledBox>
        <Heading>Select formation</Heading>
        <Select
          name="formation"
          defaultOption={formationId}
          options={formationSelectOptions}
          onChange={changeFormation}
        />
      </StyledBox>
      <Pitch formationId={formationId} />
    </StyledWrapper>
  );
};

export default FormationStep;
