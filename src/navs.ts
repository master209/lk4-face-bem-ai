import { INavItem } from './blocks/SideNavLk4';
import { AppRoute } from './const';

export const navSideMenu: INavItem[] = [
  {
    id: 'about',
    title: 'О компании',
    links: [
      {to: AppRoute.Contacts, text: 'Контакты'},
    ],
  },
];
