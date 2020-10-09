import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ButtonIcon from 'components/common/ButtonIcon';
import { routes } from 'routes';

import Logo from 'components/common/Logo';

import DotsImage from 'assets/dots.png';
import AsideDecorationImage from 'assets/aside_deco.png';

import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as FilterIcon } from 'assets/icons/strategy.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';

const StyledWrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  background: var(--color-background-lighter);
  z-index: 2;

  @media (min-width: 768px) {
    width: 100px;
    height: 100vh;
    flex-direction: column;

    &:before {
      content: '';
      position: absolute;
      left: 10px;
      bottom: 0px;
      display: block;
      width: 100%;
      height: 240px;
      background: url(${() => DotsImage});
      background-size: 95%;
      filter: invert(1);
      opacity: 0.7;
    }

    &:after {
      content: '';
      position: absolute;
      left: 100%;
      bottom: 30px;
      display: block;
      width: 18px;
      height: 234px;
      background: url(${() => AsideDecorationImage});
      background-repeat: no-repeat;
    }
  }

  @media (min-width: 960px) {
    width: 120px;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  flex: 1;
`;

const StyledList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;

  @media (min-width: 768px) {
    flex-direction: column;
  }
`;

const StyledListItem = styled.li`
  position: relative;
  list-style-type: none;
  margin-bottom: 30px;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  &.active {
    opacity: 1;
  }
`;

const navItems = [
  {
    to: routes.home,
    icon: <HomeIcon />,
    title: 'Home',
  },
  {
    to: routes.tactics,
    icon: <FilterIcon />,
    title: 'Tactics',
  },
  {
    to: routes.creator,
    icon: <PlusIcon />,
    title: 'New tactic',
  },
];

const Sidebar = () => (
  <StyledWrapper>
    <Logo />
    <StyledNav>
      <StyledList>
        {navItems.map(({ to, icon, title }) => (
          <StyledListItem key={to}>
            <StyledButtonIcon as={NavLink} exact to={to} activeclass="active" title={title}>
              {icon}
            </StyledButtonIcon>
          </StyledListItem>
        ))}
      </StyledList>
    </StyledNav>
  </StyledWrapper>
);

export default Sidebar;
