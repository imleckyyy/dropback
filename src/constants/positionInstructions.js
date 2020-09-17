export default [
  {
    id: 1,
    name: 'Forwards Attacking Runs',
    positions: ['ST', 'LF', 'RF', 'CF'],
    settings: {
      1: {
        name: 'Get In Behind',
        description: 'Make forwards runs in behind the defence.',
      },
      2: {
        name: 'Mixed Attack',
        description: 'Occasionally make forward runs when the opportunity arises.',
      },
      3: {
        name: 'Target Man',
        description: 'Back into an opponent and ask for the ball to feet.',
      },
      4: {
        name: 'False 9',
        description:
          'Drops into midfield to create attacking space for teammates and has time and space to dribble or pick up passes.',
      },
    },
    default: 2,
  },
  {
    id: 2,
    name: 'Full Backs Attacking Runs',
    positions: ['LWB', 'LB', 'RB', 'RWB'],
    settings: {
      1: {
        name: 'Join the Attack',
        description: 'Make forwards runs as much as possible.',
      },
      2: {
        name: 'Balanced Attack',
        description: 'Occasionally make forward runs when the opportunity arises.',
      },
      3: {
        name: 'Stay Back While Attacking',
        description: 'Never make forward runs while on attack.',
      },
    },
    default: 2,
  },
  {
    id: 3,
    name: 'Midfielders Attacking Support',
    positions: ['CDM', 'CM'],
    settings: {
      1: {
        name: 'Drop Between Defenders',
        description: 'Keep in the back and maintain the shape of the formation.',
      },
      2: {
        name: 'Stay Back While Attacking',
        description: 'Never make forward runs while on attack.',
      },
      3: {
        name: 'Balanced Attack',
        description: 'Occasionally make forward runs when the opportunity arises.',
      },
      4: {
        name: 'Get Forward',
        description: 'Join the attack and make runs beyond the striker(s).',
      },
    },
    default: 3,
  },
  {
    id: 4,
    name: 'Centre Backs Attacking Support',
    positions: ['CB'],
    settings: {
      1: {
        name: 'Join the Attack',
        description: 'Occasionally make forward runs when the opportunity arises.',
      },
      2: {
        name: 'Stay Back While Attacking',
        description: 'Never make forward runs while on attack.',
      },
      3: {
        name: 'Play As Striker',
        description: 'Go up front in the last few minutes of a match if losing.',
      },
    },
    default: 3,
  },
  {
    id: 5,
    name: 'Chance Creation',
    positions: ['LW', 'RW'],
    settings: {
      1: {
        name: 'Cut Inside',
        description: 'Make cutting runs to the inside from out wide.',
      },
      2: {
        name: 'Balanced Width',
        description: 'Stay wide or cut inside depending on the situation.',
      },
      3: {
        name: 'Stay Wide',
        description: 'Always try to stay wide and close to the line.',
      },
      4: {
        name: 'Free Roam',
        description: 'Take a free role and roam the attacking third.',
      },
    },
    default: 2,
  },
  {
    id: 6,
    name: 'Defensive Behaviour',
    positions: ['CDM'],
    settings: {
      1: {
        name: 'Cut Passing Lanes',
        description: 'Split the opposition and cut out the passing lanes.',
      },
      2: {
        name: 'Balanced Defence',
        description: 'Keep your shape and stay in position to defend.',
      },
      3: {
        name: 'Man Mark',
        description: 'Mark up tight and stick with your opponent.',
      },
    },
    default: 2,
  },
  {
    id: 7,
    name: 'Defensive Position',
    positions: ['CM', 'CDM'],
    settings: {
      1: {
        name: 'Cover Center',
        description: 'Always try to defend central positions.',
      },
      2: {
        name: 'Cover Wing',
        description: 'Defend the open wing if teammate isn’t marking.',
      },
    },
    default: 2,
  },
  {
    id: 8,
    name: 'Defensive Support',
    positions: ['LM', 'CAM', 'RM', 'LW', 'RW', 'LF', 'CF', 'RF', 'ST'],
    settings: {
      1: {
        name: 'Come Back on Defence',
        description: 'Always try to track back and support the defence.',
      },
      2: {
        name: 'Basic Defence Support',
        description: 'Come back to support the defence when needed.',
      },
      3: {
        name: 'Stay Forward',
        description: 'Do not come back to support the defence.',
      },
    },
    default: 2,
  },
  {
    id: 9,
    name: 'Interceptions',
    positions: [
      'LWB',
      'LB',
      'CB',
      'RB',
      'RWB',
      'CDM',
      'CM',
      'LM',
      'CAM',
      'RM',
      'LW',
      'RW',
      'LF',
      'CF',
      'RF',
      'ST',
    ],
    settings: {
      1: {
        name: 'Aggressive Interceptions',
        description: 'Always looking to intercept passes aggressively.',
      },
      2: {
        name: 'Normal Interceptions',
        description: 'Looking to intercept passes when the interception chance is reasonable.',
      },
      3: {
        name: 'Conservative Interceptions',
        description: 'Only trying to intercept passes if the player can win the ball clearly.',
      },
    },
    default: 2,
  },
  {
    id: 10,
    name: 'Positioning Freedom',
    positions: ['CM', 'CAM'],
    settings: {
      1: {
        name: 'Free Roam',
        description: 'Take a free role and roam the attacking third.',
      },
      2: {
        name: 'Stick to Position',
        description: 'Stay in your formation position when attacking.',
      },
    },
    default: 2,
  },
  {
    id: 11,
    name: 'Support on Crosses',
    positions: ['CM', 'LM', 'CAM', 'RM', 'LW', 'RW'],
    settings: {
      1: {
        name: 'Get Into The Box For Cross',
        description: 'Make runs into the penalty area in crossing situations.',
      },
      2: {
        name: 'Balanced Crossing Runs',
        description: 'Run into the penalty area or stay on the edge in crossing situations.',
      },
      3: {
        name: 'Stay On Edge Of Box For Cross',
        description: 'Stay on the edge of the penalty area in crossing situations.',
      },
    },
    default: 2,
  },
  {
    id: 12,
    name: 'Central Forwards Support Runs',
    positions: ['LF', 'CF', 'RF', 'ST'],
    settings: {
      1: {
        name: 'Drift Wide',
        description: 'Make runs to wide areas of the pitch.',
      },
      2: {
        name: 'Balanced Width',
        description: 'Stay wide or cut inside depending on the situation.',
      },
      3: {
        name: 'Stay Central',
        description: 'Stay in central areas of the pitch.',
      },
    },
    default: 2,
  },
  {
    id: 13,
    name: 'Wingers Support Runs',
    positions: ['LM', 'RM', 'LW', 'RW'],
    settings: {
      1: {
        name: 'Get In Behind',
        description: 'Make forward runs in behind the defence.',
      },
      2: {
        name: 'Balanced Support',
        description: 'Make forward runs or come short depending on the situation.',
      },
      3: {
        name: 'Come Short',
        description: 'Come short and ask for the ball to feet.',
      },
      4: {
        name: 'Target Man',
        description: 'Back into an opponent and ask for the ball to feet.',
      },
    },
    default: 2,
  },
  {
    id: 14,
    name: 'Run Type',
    positions: ['LWB', 'LB', 'RB', 'RWB'],
    settings: {
      1: {
        name: 'Inverted',
        description:
          'Make underlapping run on the inside of the wide players for more central support.',
      },
      2: {
        name: 'Mixed Attack',
        description: 'Occasionaly make forward runs when the opportunity arises.',
      },
      3: {
        name: 'Overlap',
        description: 'Make overlapping run on the outside.',
      },
    },
    default: 2,
  },
  {
    id: 15,
    name: 'Saving on Crosses',
    positions: ['GK'],
    settings: {
      1: {
        name: 'Comes for Crosses',
        description: 'Goalkeeper will come off his line more often when defending crosses.',
      },
      2: {
        name: 'Balanced',
        description:
          'Default behaviour during crosses to stay or come for crosses depending on the situation.',
      },
      3: {
        name: 'Cautious with Crosses',
        description: 'Goalkeeper will stay on his line more often when defending crosses.',
      },
    },
    default: 2,
  },
  {
    id: 16,
    name: 'Saving Outside Box',
    positions: ['GK'],
    settings: {
      1: {
        name: 'Sweeper Keeper',
        description: 'Aggressive coming outside of box and challenging opponent for loose balls.',
      },
      2: {
        name: 'Balanced',
        description: 'Conservative on balls outside of the box unless clearly getting to it first.',
      },
    },
    default: 2,
  },
];
