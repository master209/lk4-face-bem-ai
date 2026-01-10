import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { IClassNameProps } from '@bem-react/core';

import { SideNavLk4 } from '../../../blocks/SideNavLk4';
import { IHandleClick, INavItem } from '../../../blocks/SideNavLk4';
import { cnPage } from '..';

import { setIsMenuClosed, setActivePageMenuId, setActivePageMenuLink } from '../../../store/main-process';

import { navSideMenu } from '../../../navs';
import { ROUTE_MENU_POSITION } from '../../../const';
import { useAppDispatch, useAppSelectors } from '../../../hooks';

import './Page-Nav.scss';

const SCREEN_WIDTH = 768;

export const PageNav: FC<IClassNameProps> = ({...props}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { activePageMenu } = useAppSelectors();

  const urlPath = useMemo(() => location.pathname.split('/'), [location.pathname]);

  const isValidPath = useMemo(() => {
    const menuId = urlPath[ROUTE_MENU_POSITION];
    return navSideMenu.some(({id}: INavItem) => id === menuId);
  }, [urlPath]);

  const setActiveNavItemId = useCallback((navItemId: string) => {
    dispatch(setActivePageMenuId({navItemId}));
  }, [dispatch]);

  const setActiveNavLinkId = useCallback(({navLinkId}: IHandleClick, closeMenu = true) => {
    dispatch(setActivePageMenuLink({navLinkId}));
    if (closeMenu && window.innerWidth <= SCREEN_WIDTH) {
      dispatch(setIsMenuClosed(true));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isValidPath) {
      setActiveNavItemId(urlPath[ROUTE_MENU_POSITION]);
      setActiveNavLinkId({navLinkId: location.pathname}, false);
    }
  }, [location.pathname, isValidPath, urlPath, setActiveNavItemId, setActiveNavLinkId]);

  return (
    <SideNavLk4
      className={cnPage('SideNav')}
      navItems={navSideMenu}
      activeNavItem={
        {id: activePageMenu.id, link: activePageMenu.link}
      }
      handleNavItemClick={setActiveNavItemId}
      handleNavLinkClick={setActiveNavLinkId}
      {...props}
    />
  );
};
