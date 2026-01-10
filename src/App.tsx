import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { configureRootTheme } from '@yandex/ui/Theme';
import { theme } from '@yandex/ui/Theme/presets/default';

import { IRouteItem, IRouteController, IRouteAction } from './blocks/SideNavLk4';
import { PrivateRoute, ModuleLayout, ControllerLayout, LayoutEmpty } from './components';
import HelpLink from './pages/auth/HelpLink';

import { isCookiesDone } from './services/cookies';
import { routsSideMenu } from './routs';
import { useAppSelectors } from './hooks';
import { AppRoute } from './const';
import { getAction } from './helpers';

import HomeScreen from './pages/home-screen';

// https://yastatic.net/s3/frontend/lego/storybook/index.html?path=/docs/surface-tooltip-desktop--playground
configureRootTheme({ theme });

const NotFoundScreen = lazy(() => import('./pages/not-found-screen'));
const CookieForm = lazy(() => import('./pages/auth/CookieForm'));
const LoginForm = lazy(() => import('./pages/auth/LoginForm'));
const RegaForm = lazy(() => import('./pages/auth/RegaForm'));
const PhoneConfirmForm = lazy(() => import('./pages/auth/PhoneConfirmForm'));
const RequestResetPasswordForm = lazy(() => import('./pages/auth/RequestResetPasswordForm'));
const ResetPasswordPhoneConfirmForm = lazy(() => import('./pages/auth/ResetPasswordPhoneConfirmForm'));

const App: FC = () => {
  const {isPhoneNotConfirmed, regaResponse: {phoneConfirmToken}} = useAppSelectors();
  const {requestResetPasswordResponse: {phoneConfirmToken: resetPasswordConfirmToken}} = useAppSelectors();

  return (
    <Routes>
      <Route path="" element={
        <PrivateRoute>
          <HomeScreen/>
        </PrivateRoute>
      }
      />
      {routsSideMenu.map(({module, controllers}: IRouteItem) => (
        <Route
          key={module}
          path={module}
          element={<ModuleLayout moduleName={module}/>}
        >
          {controllers.map(({controller, actions}: IRouteController) => (
            <Route
              key={`${module}-${controller}`}
              path={controller}
              element={<ControllerLayout controllerName={controller}/>}
            >
              {actions.map(({action, param, page: Element}: IRouteAction) => (
                <Route
                  key={`${module}-${controller}-${action}`}
                  path={getAction(action, param)}
                  element={
                    <PrivateRoute>
                      <Element/>
                    </PrivateRoute>
                  }
                />
              ))}
            </Route>
          ))}
        </Route>
      ))}
      <Route path={AppRoute.Login} element={
        <LayoutEmpty>
          {isPhoneNotConfirmed ? <PhoneConfirmForm/> : (
            <div>
              <LoginForm/>
              <HelpLink/>
            </div>
          )}
          {!isCookiesDone() && <CookieForm/>}
        </LayoutEmpty>
      }
      />
      <Route path={AppRoute.Rega} element={
        <LayoutEmpty>
          {phoneConfirmToken ? <PhoneConfirmForm/> : <RegaForm/>}
          {!isCookiesDone() && <CookieForm/>}
        </LayoutEmpty>
      }
      />
      <Route path={AppRoute.ResetPassword} element={
        <LayoutEmpty>
          {resetPasswordConfirmToken ? <ResetPasswordPhoneConfirmForm/> : <RequestResetPasswordForm/>}
          {!isCookiesDone() && <CookieForm/>}
        </LayoutEmpty>
      }
      />
      <Route path="*" element={<NotFoundScreen/>}/>
    </Routes>
  );
};

export default App;
