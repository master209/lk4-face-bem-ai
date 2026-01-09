import {FC, ReactNode, useEffect} from 'react';
import { IClassNameProps } from '@bem-react/core';

import { Topbar } from '..';
import { cnPage, PageMain, PageMenu } from '.';
import { setIsMenuClosed } from '../../store/main-process';
import { useAppDispatch } from '../../hooks';

import './Page.scss';
import 'react-toastify/dist/ReactToastify.css';

// Это брекпоинт, начиная с которого, при перезагрузке страницы меню отображается в свернутом виде
const SCREEN_WIDTH = 768;

export interface IPageProps extends IClassNameProps {
  children: ReactNode;
}

export const Page: FC<IPageProps> = ({children}) => {
  const dispatch = useAppDispatch();

  // автоматически скрывать меню, если ширина экрана меньше SCREEN_WIDTH
  useEffect(() => {
    window.innerWidth <= SCREEN_WIDTH && dispatch(setIsMenuClosed(true));
  }, []);

  return (
    <div className="App Container">
      {
        <>
          <Topbar/>
          <div className={cnPage(null, ['Wrap'])}>
            <PageMenu/>
            <PageMain>{children}</PageMain>
          </div>
        </>
      }
    </div>
  );
};
