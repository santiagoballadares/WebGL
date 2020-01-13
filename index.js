import React from 'react';
import ReactDOM from 'react-dom';
import {AppContextProvider} from './src/components/appContext';
import App from './src/components/app';

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById('root')
);
