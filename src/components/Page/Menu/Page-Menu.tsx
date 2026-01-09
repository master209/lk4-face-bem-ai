import { FC } from 'react';
import { IClassNameProps } from '@bem-react/core';

import { cnPage } from '..';
import { getIsMenuClosed} from '../../../store/main-process';
import { useAppSelector } from '../../../hooks';

import './Page-Menu.scss';

export const PageMenu: FC<IClassNameProps> = () => {
  const isMenuClosed = useAppSelector(getIsMenuClosed);

  return (
    <div className={`${cnPage()}__menu ${isMenuClosed ? `${cnPage()}__menu_closed` : ''}`}>
      Меню
    </div>
  );
};
