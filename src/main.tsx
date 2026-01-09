import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux';
import HistoryRouter from './components/HistoryRouter';
import browserHistory from './browser-history';
import App from './App';

import { store } from './store';

//https://www.npmjs.com/package/@fontsource/montserrat
import '@fontsource/montserrat/cyrillic-100.css';
import '@fontsource/montserrat/cyrillic-300.css';
import '@fontsource/montserrat/cyrillic-400.css';
import '@fontsource/montserrat/cyrillic-600.css';
import '@fontsource/montserrat/cyrillic-700.css';

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>,
);
