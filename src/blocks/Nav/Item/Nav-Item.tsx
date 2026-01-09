import React, { FC, MouseEvent } from 'react';

import { IClassNameProps } from '@bem-react/core';

import { cnNav, ILink, NavLink } from '..';

import './Nav-Item.scss';
import './_active/Nav-Item_active.scss';

export interface INavItemProps extends IClassNameProps {
  link: ILink;
  activeItemId: string;
  handleClick: (ev: MouseEvent) => void;
}

export const NavItem: FC<INavItemProps> = ({
  link: {to, text},
  activeItemId,
  handleClick
}) => (
  <li className={`${cnNav()}__item ${to === activeItemId ? `${cnNav()}__item_active` : ''}`}>
    <NavLink
      href={`/${to}`}
      handleClick={(ev: MouseEvent) => handleClick(ev)}
    >
      {text}
    </NavLink>
  </li>
);
