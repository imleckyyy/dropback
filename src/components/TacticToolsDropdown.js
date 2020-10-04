import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import { FetchContext } from 'context/FetchContext';

import ButtonIcon from 'components/common/ButtonIcon';
import Anchor from 'components/common/Anchor';
import Button from 'components/common/Button';
import Loader from 'components/Loader';
import Notyfication from 'components/common/Notyfication';

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
  background: var(--color-background-lighter);
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
  padding: 10px 20px;
  background: none;
`;

const TacticDropdown = ({ tacticId }) => {
  const ref = useRef();

  const [redirectOnSuccess, setRedirectOnSuccess] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { apiAxios } = useContext(FetchContext);

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const onDelete = async () => {
    const isConfirmed = await window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      try {
        setIsLoading(true);
        const { data } = await apiAxios.delete(`tactics/${tacticId}`);
        setErrorMessage('');
        setTimeout(() => {
          setIsLoading(false);
          setRedirectOnSuccess(true);
        }, 700);
      } catch (err) {
        const { data } = err.response;
        setErrorMessage(data.message);
        setTimeout(() => {
          setIsLoading(false);
        }, 700);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {redirectOnSuccess ? <Redirect to="/tactics" /> : null}
      {errorMessage && (
        <Notyfication onClose={() => setErrorMessage(null)} error>
          {errorMessage}
        </Notyfication>
      )}
      <StyledWrapper ref={ref}>
        <StyledButtonIcon onClick={() => setIsOpen(!isOpen)}>
          <ToolsIcon />
        </StyledButtonIcon>
        {isOpen && (
          <StyledDropdownList>
            <StyledDropdownItem>
              <StyledAnchor as={Link} to={`/creator/${tacticId}/edit`}>
                Edit
              </StyledAnchor>
            </StyledDropdownItem>
            <StyledDropdownItem>
              <StyledAnchor as={Button} type="button" onClick={onDelete}>
                Delete
              </StyledAnchor>
            </StyledDropdownItem>
          </StyledDropdownList>
        )}
      </StyledWrapper>
    </>
  );
};

export default TacticDropdown;
