import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

const TacticContext = createContext();
const { Provider } = TacticContext;

const defaultTactic = {
  formation: 1,
  tactic: {
    defenseStyle: 3,
    defenseWidth: 5,
    defenseDepth: 5,
    offenseStyle: 3,
    offenseWidth: 5,
    offensePlayersInBox: 3,
  },
  meta: {
    name: 'Lorem',
    description: 'Ipsum',
  },
};

const tacticActions = {
  SETDEFAULT: 'SETDEFAULT',
  SETFORMATION: 'SETFORMATION',
  SETTACTIC: 'SETTACTIC',
  SETDEFENSESTYLE: 'SETDEFENSESTYLE',
  SETDEFENSEWIDTH: 'SETDEFENSEWIDTH',
};

const tacticReducer = (state, action) => {
  switch (action.type) {
    case tacticActions.SETDEFAULT:
      return {
        ...defaultTactic,
      };
    case tacticActions.SETFORMATION:
      return {
        ...state,
        formation: action.payload,
      };
    case tacticActions.SETTACTIC:
      return {
        ...state,
        tactic: {
          ...state.tactic,
          [action.payload.settingName]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

const TacticProvider = ({ children }) => {
  const [{ formation, tactic, meta }, dispatch] = useReducer(tacticReducer, defaultTactic);

  const changeFormation = (formationId) =>
    dispatch({
      type: tacticActions.SETFORMATION,
      payload: formationId,
    });

  const changeTacticSetting = (settingName, value) =>
    dispatch({
      type: tacticActions.SETTACTIC,
      payload: {
        settingName,
        value,
      },
    });

  return (
    <Provider
      value={{
        formation,
        tactic,
        meta,
        changeFormation,
        changeTacticSetting,
      }}
    >
      {children}
    </Provider>
  );
};

TacticProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { TacticContext, TacticProvider };
