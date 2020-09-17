import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

import positionsByFormation from 'constants/positionsByFormation';
import positionInstructions from 'constants/positionInstructions';

const CreatorContext = createContext();
const { Provider } = CreatorContext;

const getDefaultPlayersInstructions = (formationId) => {
  const defaultInstructions = positionsByFormation[formationId].map(({ id, positionName }) => {
    const playerInstructions = positionInstructions
      .filter(({ positions }) => positions.includes(positionName))
      .map((item) => ({
        id: item.id,
        value: item.default,
      }));

    return {
      id,
      positionName,
      instructions: playerInstructions,
      modified: false,
    };
  });

  return defaultInstructions;
};

const initialState = {
  formationId: 10,
  tactic: {
    defenseStyle: 2,
    defenseWidth: 5,
    defenseDepth: 5,
    offenseStyle: 2,
    offenseWidth: 5,
    offensePlayersInBox: 5,
    corners: 3,
    freeKicks: 3,
  },
  instructions: getDefaultPlayersInstructions(10),
  meta: {
    name: 'Lorem',
    description: 'Ipsum',
  },
};

const tacticActions = {
  SET_DEFAULT: 'SET_DEFAULT',
  SET_FORMATION: 'SET_FORMATION',
  SET_DEFAULT_INSTRUCTIONS: 'SET_DEFAULT_INSTRUCTIONS',
  SET_TACTIC: 'SET_TACTIC',
  SET_INSTRUCTION: 'SET_INSTRUCTION',
};

const tacticReducer = (state, action) => {
  switch (action.type) {
    case tacticActions.SET_DEFAULT:
      return {
        ...initialState,
      };
    case tacticActions.SET_FORMATION:
      return {
        ...state,
        formationId: action.payload,
      };
    case tacticActions.SET_DEFAULT_INSTRUCTIONS:
      return {
        ...state,
        instructions: action.payload,
      };
    case tacticActions.SET_TACTIC:
      return {
        ...state,
        tactic: {
          ...state.tactic,
          [action.payload.settingName]: action.payload.value,
        },
      };
    case tacticActions.SET_INSTRUCTION:
      return {
        ...state,
        instructions: {
          ...state.instructions,
          [action.payload.id]: {
            ...state.instructions[action.payload.id],
            instructions: action.payload.instructions,
          },
        },
      };
    default:
      return state;
  }
};

const CreatorProvider = ({ children }) => {
  const [{ formationId, tactic, instructions, meta }, dispatch] = useReducer(
    tacticReducer,
    initialState,
  );

  const changeFormation = (newFormationId) => {
    dispatch({
      type: tacticActions.SET_FORMATION,
      payload: newFormationId,
    });

    dispatch({
      type: tacticActions.SET_DEFAULT_INSTRUCTIONS,
      payload: getDefaultPlayersInstructions(newFormationId),
    });
  };

  const changeTacticSetting = (settingName, value) =>
    dispatch({
      type: tacticActions.SET_TACTIC,
      payload: {
        settingName,
        value,
      },
    });

  const changePositionInstruction = (id, newInstructions) => {
    dispatch({
      type: tacticActions.SET_INSTRUCTION,
      payload: {
        id,
        newInstructions,
      },
    });
  };

  console.log(instructions);

  return (
    <Provider
      value={{
        formationId,
        tactic,
        instructions,
        meta,
        changeFormation,
        changeTacticSetting,
        changePositionInstruction,
      }}
    >
      {children}
    </Provider>
  );
};

CreatorProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { CreatorContext, CreatorProvider };
