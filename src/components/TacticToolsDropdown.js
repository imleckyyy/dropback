import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonIcon from 'components/common/ButtonIcon';
import Anchor from 'components/common/Anchor';
import Button from 'components/common/Button';

import useOutsideClick from 'hooks/useOutsideClick';

import { ReactComponent as ToolsIcon } from 'assets/icons/settings.svg';

const StyledWrapper = styled.div`
  display: inline-block;
  position: relative;
  z-index: 3;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: 45px;
  height: 45px;
  opacity: 1;

  &:hover {
    opacity: 0.5;
  }

  svg {
    fill: ${({ theme }) => theme.darkGray};
    width: 80%;
    height: 80%;
  }
`;

const StyledDropdownList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  display: block;
  width: 200px;
  background: ${({ theme }) => theme.darkGray};
  padding: 10px 0;
  margin: 0;
`;

const StyledDropdownItem = styled.li`
  display: block;
`;

const StyledAnchor = styled(Anchor)`
  display: block;
  width: 100%;
  text-align: left;
  color: ${({ theme }) => theme.fontColor.light};
  padding: 10px 20px;
  background: none;

  &:hover {
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const TacticDropdown = ({ tacticId }) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const deleteTactic = () => {
    console.log('delete');
  };

  return (
    <StyledWrapper ref={ref}>
      <StyledButtonIcon onClick={() => setIsOpen(!isOpen)}>
        <ToolsIcon />
      </StyledButtonIcon>
      {isOpen && (
        <StyledDropdownList>
          <StyledDropdownItem>
            <StyledAnchor as={Link} to={`/edit/${tacticId}`} type="button">
              Edit
            </StyledAnchor>
          </StyledDropdownItem>
          <StyledDropdownItem>
            <StyledAnchor as={Button} type="button" onClick={deleteTactic}>
              Delete
            </StyledAnchor>
          </StyledDropdownItem>
        </StyledDropdownList>
      )}
    </StyledWrapper>
  );
};

export default TacticDropdown;
