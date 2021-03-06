/**
 * ************************************
 *
 * @module  index.js
 * @author team KubeScrape
 * @date
 * @description React App Entry Point
 *
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './react/App';
import store from './redux/store';
import './index.css';

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
