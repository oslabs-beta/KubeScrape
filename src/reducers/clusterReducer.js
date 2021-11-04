/**
 * ************************************
 *
 * @module  clusterReducer
 * @description reducer for cluster data
 *
 * ************************************
 */

import * as types from './../constants/actionTypes';

const initialState = {
  deployments: []
};

const clusterReducer = (
  state = initialState,
  action
) => {
  const deepStateClone = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case types.SET_CLUSTER_DEPLOYMENTS:
      return {
        ...deepStateClone,
        deployments: action.payload
      }
    default:
        return state;
  }
}

export default clusterReducer;

