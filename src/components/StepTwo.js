import React, { useContext } from 'react';
import Heading from 'components/common/Heading';
import Paragraph from 'components/common/Paragraph';
import RangeStepper from 'components/common/RangeStepper';

import { TacticContext } from 'context/TacticContext';

const StepTwo = () => {
  const { tactic, changeTacticSetting } = useContext(TacticContext);

  return (
    <>
      <button type="button" onClick={() => changeTacticSetting('defenseWidth', 10)}>
        test
      </button>
      <Heading>Defense</Heading>
      <Paragraph>Defensive Style:</Paragraph>
      <Paragraph>Width:</Paragraph>
      <RangeStepper rate={tactic.defenseWidth} maxRate={10} />
      <Paragraph>Depth:</Paragraph>
      <RangeStepper rate={tactic.defenseDepth} maxRate={5} />

      <Heading>Offense</Heading>
      <Paragraph>Offensive Style:</Paragraph>
      <Paragraph>Width:</Paragraph>
      <Paragraph>Players In Box:</Paragraph>
    </>
  );
};

export default StepTwo;
