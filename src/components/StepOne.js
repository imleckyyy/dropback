import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'components/common/Heading';
import Select from 'components/common/Select';
import Pitch from 'components/Pitch';
import formations from 'constants/formations';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledBox = styled.div`
  flex: 1;
  min-width: 40%;
`;

const selectOptions = formations.map((item) => ({
  value: item.id,
  label: item.name,
}));

const StepOne = ({ formationId, setFormationId }) => {
  const [selectedFormation, setSelectedFormation] = useState(formationId);

  useEffect(() => {
    setFormationId(selectedFormation);
  }, [selectedFormation, setFormationId]);

  return (
    <StyledWrapper>
      <StyledBox>
        <Heading>Select formation</Heading>
        <Select
          defaultOption={formationId}
          options={selectOptions}
          onInputChange={setSelectedFormation}
        />
      </StyledBox>
      <Pitch formationId={selectedFormation} />
    </StyledWrapper>
  );
};

StepOne.propTypes = {
  formationId: PropTypes.number,
  setFormationId: PropTypes.func.isRequired,
};

StepOne.defaultProps = {
  formationId: 1,
};

export default StepOne;
