import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import HistoryRouter from './components/HistoryRouter';
import browserHistory from './browser-history';
import App from './App';

import { store } from './store';
import { fetchCheckAuth } from './store/api-actions';
import { getToken } from './services/token';

//https://www.npmjs.com/package/@fontsource/montserrat
import '@fontsource/montserrat/cyrillic-100.css';
import '@fontsource/montserrat/cyrillic-300.css';
import '@fontsource/montserrat/cyrillic-400.css';
import '@fontsource/montserrat/cyrillic-600.css';
import '@fontsource/montserrat/cyrillic-700.css';

import './index.scss';

const token = getToken();

store.dispatch(fetchCheckAuth(token));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const loader: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("loader-wrap") as HTMLCollectionOf<HTMLElement>;
loader[0].style.display = 'none';

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
