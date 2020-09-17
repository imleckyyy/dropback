import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PitchImage from 'assets/pitch.png';
import PlayerImage from 'assets/player.png';
import ActivePlayerImage from 'assets/player_active.png';

import positionsByFormation from 'constants/positionsByFormation';

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

  background: url(${({ isActive }) => (isActive ? ActivePlayerImage : PlayerImage)});
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

const Pitch = ({ formationId, activePosition, changeActivePosition }) => {
  const playerCoords = positionsByFormation[formationId];

  return (
    <StyledWrapper>
      <StyledImage src={PitchImage} />
      <StyledPlayersWrapper>
        {playerCoords.map(({ id, posX, posY, positionName }) => (
          <StyledPlayerItem
            type="button"
            key={id}
            id={id}
            posX={posX}
            posY={posY}
            positionName={positionName}
            isActive={activePosition === id}
            onClick={() => changeActivePosition(id)}
          >
            {positionName}
          </StyledPlayerItem>
        ))}
      </StyledPlayersWrapper>
    </StyledWrapper>
  );
};

Pitch.propTypes = {
  formationId: PropTypes.number.isRequired,
  activePosition: PropTypes.number,
  changeActivePosition: PropTypes.func,
};

Pitch.defaultProps = {
  activePosition: 999,
  changeActivePosition: () => {},
};

export default Pitch;
