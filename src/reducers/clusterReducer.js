/**
 * ************************************
 *
 * @module  clusterReducer
 * @description reducer for cluster data
 *
 * ************************************
 */

import * as types from '../redux/constants/actionTypes';

const initialState = {
  namespaces: [],
  deployments: [],
  services: [],
  nodes: [],
};

const clusterReducer = (state = initialState, action) => {
  const deepStateClone = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case types.SET_CLUSTER_NAMESPACES:
      return {
        ...deepStateClone,
        namespaces: action.payload,
      };
    case types.SET_CLUSTER_DEPLOYMENTS:
      return {
        ...deepStateClone,
        deployments: action.payload,
      };
    case types.SET_CLUSTER_SERVICES:
      return {
        ...deepStateClone,
        services: action.payload,
      };
    case types.SET_CLUSTER_NODES:
      return {
        ...deepStateClone,
        nodes: action.payload,
      };
    default:
      return state;
  }
};

export default clusterReducer;
