import formationTypes from 'constants/formationTypes';
import defensiveStyles from 'constants/defensiveStyles';
import offensiveStyles from 'constants/offensiveStyles';
import positionsByFormation from 'constants/positionsByFormation';
import positionInstructions from 'constants/positionInstructions';

export const getFormationName = (id) => formationTypes.find((item) => item.id === id).name;

export const getDefensiveStyleName = (id) => defensiveStyles.find((item) => item.id === id).name;

export const getOffensiveStyleName = (id) => offensiveStyles.find((item) => item.id === id).name;

export const getDefaultPlayersInstructions = (formationId) => {
  const defaultInstructions = positionsByFormation[formationId].map(({ id, positionName }) => {
    const playerInstructions = positionInstructions
      .filter(({ positions }) => positions.includes(positionName))
      .map((item) => ({
        id: item.id,
        value: item.defaultId,
      }));

    return {
      id,
      positionName,
      instructions: playerInstructions,
    };
  });
  return defaultInstructions;
};

export const formatYmd = (date) => date.toISOString().slice(0, 10);

export const formatDmy = (date) => date.toLocaleString().slice(0, 10);

export const diffDays = (date, otherDate) =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
