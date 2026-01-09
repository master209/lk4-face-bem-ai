import {configureStore} from '@reduxjs/toolkit';

import {rootReducer} from './root-reducer';
import {createAPI} from '../services/api';

export const api = createAPI();

// https://stackoverflow.com/questions/35469836/detecting-production-vs-development-react-at-runtime
const isProd: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'production';

export const store = configureStore({
  reducer: rootReducer,
  devTools: !isProd, // в проде отключаю react-devtools
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
