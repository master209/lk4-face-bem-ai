import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { configureRootTheme } from '@yandex/ui/Theme';
import { theme } from '@yandex/ui/Theme/presets/default';

import HomeScreen from './pages/home-screen';

// https://yastatic.net/s3/frontend/lego/storybook/index.html?path=/docs/surface-tooltip-desktop--playground
configureRootTheme({ theme });

const NotFoundScreen = lazy(() => import('./pages/not-found-screen'));

console.log('123 !');

const App: FC = () => {
  return (
    <Routes>
      <Route path="" element={<HomeScreen/>}/>
      <Route path="*" element={<NotFoundScreen/>}/>
    </Routes>
  );
};

export default App;
