import { lazy } from 'react';

import { ILink } from './blocks/Nav';
import { IRouteItem } from './blocks/SideNavLk4';

const HomeScreen = lazy(() => import('./pages/home-screen'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

const Contacts = lazy(() => import('./pages/about/about/Contacts'));

export const routsTopbarMenu: ILink[] = [
  {to: '', text: 'Home', page: HomeScreen},
];

export const routsSideMenu: IRouteItem[] = [
  {
    module: 'about',
    controllers: [
      {controller: 'about', actions: [
        {action: 'contacts', page: Contacts},
      ]},
    ],
  },
  {
    module: 'user',
    controllers: [
      {controller: 'settings', actions: [
        {action: 'profile', page: UserProfile},
      ]},
    ],
  },
];
