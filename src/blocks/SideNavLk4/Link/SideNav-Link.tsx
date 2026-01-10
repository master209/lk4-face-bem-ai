import React, { FC, MouseEvent } from 'react';

import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import { Link } from '../../Link';

import './SideNav-Link.scss';
import './_active/SideNav-Link_active.scss';

const cnSideNav = cn('SideNav');

export interface ISideNavLinkProps extends IClassNameProps {
  children: string;
  href: string;
  active: boolean;
  handleClick: (ev: MouseEvent) => void;
}

export const SideNavLink: FC<ISideNavLinkProps> = ({
  children,
  href,
  active,
  handleClick
}) => (
  <Link
    href={href}
    className={cnSideNav('Link', {active})}
    handleClick={handleClick}
  >
    {children}
  </Link>
);
