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
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

render(
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
, document.getElementById('root')
)
