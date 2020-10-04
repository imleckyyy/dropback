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

export const formatTacticData = (data) => ({
  formationId: data.formationId,
  tactic: {
    defenseStyle: data.defenseStyle,
    defenseWidth: data.defenseWidth,
    defenseDepth: data.defenseDepth,
    offenseStyle: data.offenseStyle,
    offenseWidth: data.offenseWidth,
    offensePlayersInBox: data.offensePlayersInBox,
    corners: data.corners,
    freeKicks: data.freeKicks,
  },
  positions: JSON.parse(data.positions),
  meta: {
    tags: data.tags,
    description: data.description,
    redditUrl: data.redditUrl,
    squadUrl: data.squadUrl,
    guideUrl: data.guideUrl,
    userName: data.userinfo.login,
    userId: data.userinfo._id,
    id: data._id,
  },
});
