import {FC, lazy, ReactNode, useEffect} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { IClassNameProps } from '@bem-react/core';

import { ToastContainer } from 'react-toastify';

import { Topbar } from '..';
import { cnPage, PageMain, PageMenu } from '.';
import { setIsMenuClosed } from '../../store/main-process';
import { useIsAuthorized, useAppSelectors, useAppDispatch } from '../../hooks';
import { AppRoute} from '../../const';

import './Page.scss';
import 'react-toastify/dist/ReactToastify.css';

// Это брекпоинт, начиная с которого, при перезагрузке страницы меню отображается в свернутом виде
const SCREEN_WIDTH = 768;

export interface IPageProps extends IClassNameProps {
  children: ReactNode;
}

export const Page: FC<IPageProps> = ({children}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAuthorized = useIsAuthorized();
  const {isCheckingAuth} = useAppSelectors();

  // автоматически скрывать меню, если ширина экрана меньше SCREEN_WIDTH
  useEffect(() => {
    window.innerWidth <= SCREEN_WIDTH && dispatch(setIsMenuClosed(true));
  }, []);

  if (location.pathname !== AppRoute.Login
    && !isCheckingAuth
    && !isAuthorized
  ) {
    return <Navigate to={AppRoute.Login} />;
  }

  return (
    <div className="App Container">
      {!isCheckingAuth ? (
        <>
          <Topbar/>
          <div className={cnPage(null, ['Wrap'])}>
            <PageMenu/>
            <PageMain>{children}</PageMain>
          </div>

          {/* https://fkhadra.github.io/react-toastify/introduction/ */}
          <ToastContainer
            position="bottom-center"
            autoClose={60000}
            newestOnTop={false}
            rtl={false}
            hideProgressBar
            // closeOnClick
            // draggable
            pauseOnFocusLoss
            pauseOnHover
            theme="colored"
          />
        </>
      ) : <p>проверяю разрешения...</p>}
    </div>
  );
};
