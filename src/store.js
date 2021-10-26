/**
 * ************************************
 *
 * @module store.js
 * @author team KuberG8
 * @date
 * @description Redux Store - "Single Source of Truth" 
 *
 * ************************************
 */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

const store = createStore(
  reducers,
  composeWithDevTools()
);

export default store;