import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IClassNameProps } from '@bem-react/core';

import { cnTopbar } from '..';
import { Nav, IHandleClick } from '../../../blocks/Nav';
import { setActiveTopbarMenuId } from '../../../store/main-process';

import { routsTopbarMenu } from '../../../routs';
import { useAppDispatch, useAppSelectors } from '../../../hooks';

import './Topbar-Nav.scss';

export const TopbarNav: FC<IClassNameProps> = ({...props}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { activeTopbarMenuId } = useAppSelectors();

  const urlPath = location.pathname.split('/');

  // location.pathname - свой или нет?
  const isTopbarPath = () =>
    routsTopbarMenu.find((menuItem) => menuItem.to === urlPath[1]);

  const setActiveNavItemId = ({navItemId}: IHandleClick) =>
    dispatch(setActiveTopbarMenuId({navItemId}));

  // при смене location.pathname - если свой - устанавливаем в его Стор
  useEffect(() => {
    if(isTopbarPath()) {
      setActiveNavItemId({navItemId: urlPath[1]});
    }
  }, [urlPath]);

  return (
    <div className={cnTopbar('Nav')}>
      <Nav
        navItems={routsTopbarMenu}
        activeItemId={activeTopbarMenuId}
        handleClick={setActiveNavItemId}
        {...props}
      />
    </div>
  );
};
