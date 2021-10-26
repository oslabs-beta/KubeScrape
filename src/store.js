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

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers }  from './reducers/index';
import thunk from 'redux-thunk'; //help redux deal with async requests

const store = createStore(
  reducers,
  //{}, //tutorial store contains empty object
  applyMiddleware(thunk),
  composeWithDevTools()
);

export default store;
