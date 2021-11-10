/**
 * ************************************
 *
 * @module  index.js
 * @author team KubeScrape
 * @date
 * @description A place to combine reducers
 *
 * ************************************
*/

import { combineReducers } from 'redux';

// import all reducers here
import clusterReducer from './clusterReducer';
import nodeReducer from './nodeReducer';
import podReducer from './podReducer';

// combine reducers
const reducers = combineReducers({
  node: nodeReducer,
  pod: podReducer,
  cluster: clusterReducer
});

export default reducers;
