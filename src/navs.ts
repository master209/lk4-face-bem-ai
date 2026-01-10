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
  {
    id: 'service',
    title: 'Интернет',
    links: [
      {to: AppRoute.MyTariff, text: 'Мои услуги'},
      {to: AppRoute.Tariffs, text: 'Тарифы'},
    ],
  },
];
