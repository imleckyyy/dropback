import React, { useState } from 'react';
import * as MultiStep from 'components/MultiStep';
import StepOne from 'components/StepOne';

const Creator = () => {
  const [formationId, setFormationId] = useState(10);

  console.log(formationId);

  return (
    <>
      <p>Selected formation: {formationId}</p>
      <MultiStep.Wizard>
        <MultiStep.Breadcrumb />
        <MultiStep.Page pageIndex={1} pageTitle="Formation">
          <StepOne formationId={formationId} setFormationId={setFormationId} />
        </MultiStep.Page>
        <MultiStep.Page pageIndex={2} pageTitle="Tactic">
          <StepOne formationId={formationId} setFormationId={setFormationId} />
        </MultiStep.Page>
        <MultiStep.Page pageIndex={3} pageTitle="Instructions">
          Page 3
        </MultiStep.Page>
        <MultiStep.Page pageIndex={4} pageTitle="Finish">
          Page 4
        </MultiStep.Page>
        <MultiStep.Controls />
      </MultiStep.Wizard>
    </>
  );
};

export default Creator;
