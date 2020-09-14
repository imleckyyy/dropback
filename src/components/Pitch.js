import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PitchImage from 'assets/pitch.png';
import PlayerImage from 'assets/player.png';

import formationPlayerCoords from 'constants/formationPlayerCoords';

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledImage = styled.img`
  max-width: 100%;
`;

const StyledPlayersWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledPlayerItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.3352%;
  height: 14.2241%;

  position: absolute;
  left: ${({ posX }) => `${posX}%`};
  bottom: ${({ posY }) => `${posY}%`};
  transform: translate(-50%, -50%);

  background: url(${() => PlayerImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  color: #ffffff;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border: none;
  cursor: pointer;
  outline: none;
  transition: opacity 300ms ease;

  &:hover {
    opacity: 0.85;
  }
`;

const PitchPlayerItem = ({ id, posX, posY, positionName, selectFn }) => {
  return (
    <StyledPlayerItem
      posX={posX}
      posY={posY}
      type="button"
      onClick={() => selectFn(id, positionName)}
    >
      {positionName}
    </StyledPlayerItem>
  );
};

PitchPlayerItem.propTypes = {
  id: PropTypes.number.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  positionName: PropTypes.string.isRequired,
  selectFn: PropTypes.func.isRequired,
};

const Pitch = ({ formationId }) => {
  const playerCoords = formationPlayerCoords[formationId];

  const playerSelect = (id, position) => console.log(`${id}, ${position}`);

  return (
    <StyledWrapper>
      <StyledImage src={PitchImage} />
      <StyledPlayersWrapper>
        {playerCoords.map(({ id, posX, posY, positionName }) => (
          <PitchPlayerItem
            key={id}
            id={id}
            posX={posX}
            posY={posY}
            positionName={positionName}
            selectFn={playerSelect}
          />
        ))}
      </StyledPlayersWrapper>
    </StyledWrapper>
  );
};

Pitch.propTypes = {
  formationId: PropTypes.number.isRequired,
};

export default Pitch;
