import React from 'react';
import StepTwo from 'components/StepTwo';
import { TacticProvider } from 'context/TacticContext';

const Main = () => {
  return (
    <TacticProvider>
      <StepTwo />
    </TacticProvider>
  );
};

export default Main;
