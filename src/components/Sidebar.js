import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ButtonIcon from 'components/common/ButtonIcon';
import { routes } from 'routes';

import HomeIcon from 'assets/icons/home.svg';
import FilterIcon from 'assets/icons/filter.svg';
import DotsImage from 'assets/dots.png';
import AsideDecorationImage from 'assets/aside_deco.png';

const StyledWrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 120px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 140px 10px;
  background: ${({ theme }) => theme.darkGray};
  color: ${({ theme }) => theme.fontColor.light};
  z-index: 2;

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
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  list-style-type: none;
  margin-bottom: 30px;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  filter: invert(1);
  background-size: 50%;

  &.active {
    opacity: 1;
  }
`;

const navItems = [
  {
    to: routes.home,
    icon: HomeIcon,
    title: 'Home page',
  },
  {
    to: routes.tactics,
    icon: FilterIcon,
    title: 'Tactics list',
  },
  {
    to: routes.creator,
    icon: FilterIcon,
    title: 'New tactic',
  },
];

const Sidebar = () => (
  <StyledWrapper>
    <nav>
      <StyledList>
        {navItems.map(({ to, icon, title }) => (
          <StyledListItem key={to}>
            <StyledButtonIcon
              as={NavLink}
              exact
              to={to}
              activeclass="active"
              icon={icon}
              title={title}
            />
          </StyledListItem>
        ))}
      </StyledList>
    </nav>
  </StyledWrapper>
);

export default Sidebar;
