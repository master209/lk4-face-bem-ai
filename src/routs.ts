import { lazy } from 'react';
import { ILink } from './blocks/Nav';

const HomeScreen = lazy(() => import('./pages/home-screen'));

export const routsTopbarMenu: ILink[] = [
  {to: '', text: 'Home', page: HomeScreen},
];
