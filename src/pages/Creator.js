import React from 'react';
import { CreatorProvider } from 'context/CreatorContext';

import * as MultiStep from 'components/MultiStep';

import FormationStep from 'components/FormationStep';
import TacticStep from 'components/TacticStep';
import InstructionsStep from 'components/InstuctionsStep';

const Creator = () => (
  <CreatorProvider>
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
        Page 4
      </MultiStep.Page>
      <MultiStep.Controls />
    </MultiStep.Wizard>
  </CreatorProvider>
);

export default Creator;
