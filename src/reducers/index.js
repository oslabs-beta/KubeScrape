/**
 * ************************************
 *
 * @module  index.js
 * @author team KuberG8
 * @date
 * @description A place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';

// import all reducers here
import nodeReducer from './nodeReducer';

// combine reducers
export const reducers = combineReducers({
  node: nodeReducer
});

