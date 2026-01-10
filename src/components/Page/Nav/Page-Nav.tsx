import React, { FC, useEffect } from 'react';
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

// Это брекпоинт, начиная с которого, при перезагрузке страницы меню отображается в свернутом виде
const SCREEN_WIDTH = 768;

export const PageNav: FC<IClassNameProps> = ({...props}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { activePageMenu } = useAppSelectors();

  const urlPath = location.pathname.split('/');

  // location.pathname - свой или нет?
  const isPagePath = () =>
    navSideMenu.find(({id}: INavItem) => id === urlPath[ROUTE_MENU_POSITION]);

  // по клику на пункте меню navItemId - устанавливаем его в Стор
  const setActiveNavItemId = (navItemId: string) =>
    dispatch(setActivePageMenuId({navItemId}));

  // по клику на пункте ПОДменю navLinkId - устанавливаем его в Стор
  const setActiveNavLinkId = ({navLinkId}: IHandleClick, closeMenu = true) => {
    dispatch(setActivePageMenuLink({navLinkId}));
    closeMenu && window.innerWidth <= SCREEN_WIDTH && dispatch(setIsMenuClosed(true));
  };

  // при смене location.pathname
  useEffect(() => {
    if(isPagePath()) { // если location.pathname свой - устанавливаем в его Стор
      setActiveNavItemId(urlPath[ROUTE_MENU_POSITION]); // пункт меню
      setActiveNavLinkId({navLinkId: location.pathname}, false); // пункт подменю
      // urlPath[ROUTE_SUBMENU_POSITION] && setActiveNavLinkId({navLinkId: urlPath[ROUTE_SUBMENU_POSITION]}); // пункт подменю
    }
  }, [urlPath]);

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
