import React, { FC, ReactNode, MouseEvent } from 'react';

import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import './SideNav-Title.scss';

const cnSideNav = cn('SideNav');

export interface ISideNavTitleProps extends IClassNameProps {
  children: ReactNode;
  handleNavItemClick: (ev: MouseEvent) => void;
}

export const SideNavTitle: FC<ISideNavTitleProps> = ({children, handleNavItemClick}) => (
  <div
    className={cnSideNav('Title')}
    onClick={handleNavItemClick}
  >
    {children}
  </div>
);
