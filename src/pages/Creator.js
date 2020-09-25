import React from 'react';
import { TacticProvider } from 'context/TacticContext';

import * as MultiStep from 'components/steps/MultiStep';

import FormationStep from 'components/steps/FormationStep';
import TacticStep from 'components/steps/TacticStep';
import InstructionsStep from 'components/steps/InstuctionsStep';
import FinishStep from 'components/steps/FinishStep';

const Creator = () => (
  <TacticProvider>
    <MultiStep.Wizard>
      <MultiStep.Breadcrumb />
      <MultiStep.Page pageIndex={1} pageTitle="Formation">
        <FormationStep />
      </MultiStep.Page>
      <MultiStep.Page pageIndex={2} pageTitle="Tactic">
        <TacticStep />
      </MultiStep.Page>
      <MultiStep.Page pageIndex={3} pageTitle="Instructions">
        <InstructionsStep />
      </MultiStep.Page>
      <MultiStep.Page pageIndex={4} pageTitle="Finish">
        <FinishStep />
      </MultiStep.Page>
      <MultiStep.Controls />
    </MultiStep.Wizard>
  </TacticProvider>
);

export default Creator;
