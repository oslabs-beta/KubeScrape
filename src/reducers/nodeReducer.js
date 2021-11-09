/**
 * ************************************
 *
 * @module  nodeReducer
 * @description reducer for node data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const initialState = {
  nodeCpuUsage: 0,
  nodeMemoryUsage: 0,
  pods: [],
  nodePodCapacity: 0
};

const nodeReducer = (
  state = initialState, 
  action
) => {
  const deepStateClone = JSON.parse(JSON.stringify(state));
  
  switch (action.type) {
    case types.SET_CPU_USAGE:
      return {
        ...deepStateClone,
        nodeCpuUsage: action.payload
      }
    case types.SET_MEMORY_USAGE:
      return {
        ...deepStateClone,
        nodeMemoryUsage: action.payload
      }
    case types.SET_NODE_PODS:
      return {
        ...deepStateClone,
        pods: action.payload
      }
    case types.SET_POD_CAPACITY:
      return {
        ...deepStateClone,
        nodePodCapacity: action.payload
      }
    default:
      return state
  }
};

export default nodeReducer;
