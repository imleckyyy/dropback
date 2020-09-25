import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { TacticContext } from 'context/TacticContext';
import Heading from 'components/common/Heading';
import ButtonIcon from 'components/common/ButtonIcon';

import { ReactComponent as PrevIcon } from 'assets/icons/prev.svg';
import { ReactComponent as NextIcon } from 'assets/icons/next.svg';

import decoImage1 from 'assets/deco_01.png';
import decoImage2 from 'assets/deco_02.png';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  background: ${({ theme }) => theme.lightGray};
  flex: 1 1 calc(50% - 20px);
  min-width: 200px;

  &:nth-child(1):before {
    content: '';
    position: absolute;
    z-index: -1;
    left: -85px;
    top: 115px;
    display: block;
    width: 114px;
    height: 199px;
    background-size: 100%;
    background: url(${() => decoImage2});
  }

  &:nth-child(4):before {
    content: '';
    position: absolute;
    z-index: -1;
    left: -8px;
    top: 10px;
    display: block;
    width: 10px;
    height: 168px;
    background-size: 100%;
    background: url(${() => decoImage1});
  }
`;

const StyledHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-transform: uppercase;
  text-align: center;
  padding: 10px;
  margin: 10px 0;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledItem = styled.li`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  margin: 0 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  animation: ${fadeIn} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

const StyledControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: 30px;
  height: 20px;
  outline: none;
  svg {
    fill: ${({ theme }) => theme.darkGray};
    width: 20px;
    height: 20px;
  }
`;

const StyledPaginationWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  background: ${({ theme }) => theme.darkGray};
  padding: 0 10px;
  margin: 0 10px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }

  &:before {
    left: -10px;
    border-right: 10px solid ${({ theme }) => theme.darkGray};
  }

  &:after {
    right: -10px;
    border-left: 10px solid ${({ theme }) => theme.darkGray};
  }
`;

const StyledDot = styled.div`
  position: relative;
  display: block;
  width: 7px;
  height: 7px;
  margin: 0 5px;
  border-radius: 50%;
  background: ${({ isActive, theme }) => (isActive ? theme.gradient : '#ffffff')};
  cursor: pointer;
`;

const InstructionsItem = ({ id, name, value, onChange, settings }) => {
  const { mode } = useContext(TacticContext);
  const [currentOption, setCurrentOption] = useState(value);
  const settingsCount = settings.length;

  useEffect(() => {
    setCurrentOption(value);
  }, [value]);

  const nextOption = () => {
    let nextIndex = currentOption + 1;
    if (currentOption === settingsCount) {
      nextIndex = 1;
    }

    setCurrentOption(nextIndex);
    onChange(id, nextIndex);
  };

  const prevOption = () => {
    let nextIndex = currentOption - 1;

    if (currentOption === 1) {
      nextIndex = settingsCount;
    }
    setCurrentOption(nextIndex);
    onChange(id, nextIndex);
  };

  const setOption = (option) => {
    setCurrentOption(option);
    onChange(id, option);
  };

  let dots = [];
  for (let index = 0; index < settingsCount; index += 1) {
    const currentIndex = index + 1;
    dots.push(
      <StyledDot
        key={currentIndex}
        isActive={currentOption === currentIndex}
        onClick={() => setOption(currentIndex)}
      />,
    );
  }

  return (
    <StyledWrapper>
      <StyledHeading>{name}</StyledHeading>
      <StyledList>
        {settings.map((item) => (
          <StyledItem key={item.id} isActive={item.id === currentOption}>
            {item.name}
          </StyledItem>
        ))}
      </StyledList>
      {mode !== 'view' ? (
        <StyledControlsWrapper>
          <StyledButtonIcon onClick={prevOption} type="button">
            <PrevIcon />
          </StyledButtonIcon>
          <StyledPaginationWrapper>{dots}</StyledPaginationWrapper>
          <StyledButtonIcon onClick={nextOption} type="button">
            <NextIcon />
          </StyledButtonIcon>
        </StyledControlsWrapper>
      ) : null}
    </StyledWrapper>
  );
};

InstructionsItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  settings: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InstructionsItem;
