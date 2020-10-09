import React, { useReducer, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

import { getDefaultPlayersInstructions } from 'utils/tactic';
import tacticsViewModes from 'constants/tacticsViewModes';

const TacticContext = createContext();
const { Provider } = TacticContext;

const initialFormationId = 23;
const initialState = {
  formationId: initialFormationId,
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
  positions: getDefaultPlayersInstructions(initialFormationId),
  meta: {
    tags: '',
    description: '',
    redditUrl: '',
    squadUrl: '',
    guideUrl: '',
  },
};

const tacticActions = {
  SET_DEFAULT: 'SET_DEFAULT',
  SET_TACTIC: 'SET_TACTIC',
  SET_FORMATION: 'SET_FORMATION',
  SET_DEFAULT_INSTRUCTIONS: 'SET_DEFAULT_INSTRUCTIONS',
  SET_TACTIC_SETTING: 'SET_TACTIC_SETTING',
  SET_INSTRUCTION: 'SET_INSTRUCTION',
  SET_META_DATA: 'SET_META_DATA',
};

const tacticReducer = (state, action) => {
  switch (action.type) {
    case tacticActions.SET_DEFAULT:
      return {
        ...initialState,
      };
    case tacticActions.SET_TACTIC:
      return {
        ...action.payload,
      };
    case tacticActions.SET_FORMATION:
      return {
        ...state,
        formationId: action.payload,
      };
    case tacticActions.SET_DEFAULT_INSTRUCTIONS:
      return {
        ...state,
        positions: action.payload,
      };
    case tacticActions.SET_TACTIC_SETTING:
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
        positions: state.positions.map((item) => {
          return {
            ...item,
            instructions:
              item.id === action.payload.id ? action.payload.newInstructions : item.instructions,
          };
        }),
      };
    case tacticActions.SET_META_DATA:
      return {
        ...state,
        meta: {
          ...state.meta,
          [action.payload.dataType]: action.payload.data,
        },
      };
    default:
      return state;
  }
};

const TacticProvider = ({ children, initialTacticData, mode }) => {
  const [{ formationId, tactic, positions, meta }, dispatch] = useReducer(
    tacticReducer,
    initialState,
  );

  useEffect(() => {
    if (initialTacticData) {
      dispatch({
        type: tacticActions.SET_TACTIC,
        payload: initialTacticData,
      });
    } else {
      dispatch({
        type: tacticActions.SET_DEFAULT,
      });
    }
  }, [initialTacticData]);

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
      type: tacticActions.SET_TACTIC_SETTING,
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

  const changeMetaData = (dataType, data) => {
    dispatch({
      type: tacticActions.SET_META_DATA,
      payload: {
        dataType,
        data,
      },
    });
  };

  return (
    <Provider
      value={{
        mode,
        formationId,
        tactic,
        positions,
        meta,
        changeFormation,
        changeTacticSetting,
        changePositionInstruction,
        changeMetaData,
      }}
    >
      {children}
    </Provider>
  );
};

TacticProvider.propTypes = {
  children: PropTypes.element.isRequired,
  initialTacticData: PropTypes.shape({
    tactic: PropTypes.shape({
      defenseStyle: PropTypes.number.isRequired,
      defenseWidth: PropTypes.number.isRequired,
      defenseDepth: PropTypes.number.isRequired,
      offenseStyle: PropTypes.number.isRequired,
      offenseWidth: PropTypes.number.isRequired,
      offensePlayersInBox: PropTypes.number.isRequired,
      corners: PropTypes.number.isRequired,
      freeKicks: PropTypes.number.isRequired,
    }).isRequired,
    positions: PropTypes.arrayOf(PropTypes.object).isRequired,
    meta: PropTypes.shape({
      tags: PropTypes.string,
      description: PropTypes.string,
      redditUrl: PropTypes.string,
      squadUrl: PropTypes.string,
      guideUrl: PropTypes.string,
      userName: PropTypes.string,
      userId: PropTypes.string,
    }).isRequired,
  }),
  mode: PropTypes.oneOf([
    tacticsViewModes.view,
    tacticsViewModes.create,
    tacticsViewModes.edit,
    tacticsViewModes.clone,
  ]),
};

TacticProvider.defaultProps = {
  mode: tacticsViewModes.view,
};

export { TacticContext, TacticProvider };
